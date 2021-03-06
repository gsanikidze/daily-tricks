import { NextApiRequest, NextApiResponse } from 'next';

import { strToHash } from '../helpers';

type Data = {
  message: string;
  errors?: any[];
  data?: Record<string, any>;
};

export type ThenType<T extends (...a: any) => any> = T extends (...a: any) => Promise<infer U> ? U
  : T extends (...a: any) => infer U ? U : any;

type Middleware = (req: NextApiRequest, res: NextApiResponse<Data>) => Promise<any>;

export abstract class Route<T> {
  public matches: (req: NextApiRequest) => boolean;

  public middleware: (Middleware)[];

  public handler: (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    middleware: ThenType<() => T>,
  ) => Promise<void | [number, any[]] | [number] | [number, Record<string, any>]>;
}

const responseMessages: Record<number, string> = {
  404: 'Resource is undefined',
  500: 'Oops, something went wrong',
  422: 'Invalid Record',
  201: 'Created Successfully',
  200: 'Success Response',
  403: 'Forbidden',
};

const middlewareCache: Record<string, {
  res: ThenType<Middleware>,
  setAt: number,
  hash: number,
}> = {};
const cacheTime = 10 * 60 * 1000;

export function router(routes: Route<any[]>[]) {
  return async function routeHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
  ): Promise<any> {
    try {
      const matchedRoute = routes.find((route) => route.matches(req));

      if (!matchedRoute) {
        return res.status(404).json({ message: 'Route is undefined' });
      }

      const middlewareRes: ThenType<Middleware>[] = [];

      for await (const md of matchedRoute.middleware) {
        const hash = strToHash(req.rawHeaders.join());

        if (
          !middlewareCache[md.name]
          || Date.now() - middlewareCache[md.name].setAt >= cacheTime
          || middlewareCache[md.name].hash !== hash
        ) {
          middlewareCache[md.name] = {
            res: await md(req, res),
            setAt: Date.now(),
            hash: strToHash(req.rawHeaders.join()),
          };
        }

        middlewareRes.push(middlewareCache[md.name].res);
      }

      const response = await matchedRoute.handler(req, res, middlewareRes);

      if (Array.isArray(response)) {
        const [statusCode, data] = response;
        const payload: Data = {
          message: responseMessages[statusCode] || responseMessages[500],
        };

        if (String(statusCode)[0] === '2') {
          payload.data = data;
        } else {
          payload.errors = data as any[];
        }

        return res.status(statusCode).json(payload);
      }

      return response;
    } catch (e) {
      return res.status(500).send({ message: responseMessages[500], errors: [e] });
    }
  };
}
