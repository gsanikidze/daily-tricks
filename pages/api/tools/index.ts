import 'reflect-metadata';
import { validate } from 'class-validator';

import { Tool, ToolCategory } from '../../../db';
import {
  dbConnection, router, Route, ThenType,
} from '../../../apiUtils';

const addTool: Route<[
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
    const { name } = req.body;
    const $regex = new RegExp(name as string, 'i');

    const alreadyExist = await connection.manager.findOne(
      Tool,
      { where: { name: $regex } },
    );

    if (alreadyExist) {
      return [400, [`${alreadyExist.name} - Already Exists`]];
    }

    const {
      categoryIds, description, homepageUrl, imageSrc, tags,
    } = req.body;

    if (tags.length === 0 || tags.length > 5) {
      return [422, ['Tags should be between 1 and 5']];
    }

    if (categoryIds.length === 0 || categoryIds.length > 3) {
      return [422, ['Categories should be between 1 and 3']];
    }

    const categories = await connection.manager.findByIds(ToolCategory, categoryIds);

    if (categories.length !== categoryIds.length) {
      return [422, ['Some of the categories are undefined']];
    }

    const tool = new Tool();
    tool.name = name;
    tool.categoryIds = categoryIds;
    tool.description = description;
    tool.homepageUrl = homepageUrl;
    tool.imageSrc = imageSrc;
    tool.tags = tags;

    const errors = await validate(tool);

    if (errors.length > 0) {
      return [422, errors];
    }

    await connection.manager.save(tool);

    return [201];
  },
};

const getTools: Route<[
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
    const where: Record<string, any> = {};
    const { q, skip, take } = req.query;

    if (q) {
      const $regex = new RegExp(q as string, 'i');

      where.$or = [
        { name: { $regex } },
        { description: { $regex } },
      ];
    }

    const [records, count] = await connection.manager.findAndCount(
      Tool,
      {
        skip: Number(skip) || 0,
        take: Number(take) || 10,
        where,
      },
    );

    return [200, { records, count }];
  },
};

export default router([addTool, getTools]);
