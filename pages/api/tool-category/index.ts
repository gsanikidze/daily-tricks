import 'reflect-metadata';
import { validate } from 'class-validator';

import { ToolCategory } from '../../../db';
import {
  dbConnection, router, Route, ThenType,
} from '../../../apiUtils';

const addCategory: Route<[
  ThenType<typeof dbConnection>,
]> = {
  matches: (req) => req.method === 'POST',
  middleware: [dbConnection],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const [connection] = middleware;
    const { title } = req.body;
    const $regex = new RegExp(title as string, 'i');

    const alreadyExist = await connection.manager.findOne(
      ToolCategory,
      { where: { title: $regex } },
    );

    if (alreadyExist) {
      return [400, [`${alreadyExist.title} - Already Exists`]];
    }

    const category = new ToolCategory();
    category.title = title;

    const errors = await validate(category);

    if (errors.length > 0) {
      return [422, errors];
    }

    await connection.manager.save(category);

    return [201];
  },
};

const getCategories: Route<[
  ThenType<typeof dbConnection>,
]> = {
  matches: (req) => req.method === 'GET',
  middleware: [dbConnection],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const [connection] = middleware;
    const categories = await connection.manager.find(ToolCategory, { order: { title: 'ASC' } });

    return [200, categories];
  },
};

export default router([addCategory, getCategories]);
