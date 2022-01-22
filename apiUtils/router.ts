import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  errors?: any[];
  data?: Record<string, any>;
};

export type ThenType<T extends (...a: any) => any> = T extends (...a: any) => Promise<infer U> ? U
  : T extends (...a: any) => infer U ? U : any;

export abstract class Route<T> {
  public matches: (req: NextApiRequest) => boolean;

  public middleware: ((req: NextApiRequest, res: NextApiResponse<Data>) => Promise<any>)[];

  public handler: (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    middleware: ThenType<() => T>,
  ) => Promise<void>;
}

export function router(routes: Route<any[]>[]) {
  return async function routeHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
      const matchedRoute = routes.find((route) => route.matches(req));

      if (!matchedRoute) {
        res.status(404).json({ message: 'Route is undefined' });
      } else {
        const middlewareRes = await Promise.all(matchedRoute.middleware.map((md) => md(req, res)));

        await matchedRoute.handler(req, res, middlewareRes);
      }
    } catch (e) {
      res.status(500).send({ message: 'Oops, Something went wrong.', errors: [e] });
    }
  };
}
