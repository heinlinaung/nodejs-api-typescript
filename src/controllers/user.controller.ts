import { Request, Response } from 'express';
import { omit } from 'lodash'
import logger from '../utils/logger';
import { createUser } from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  logger.info('createUserHandler');
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'))
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message)
  }
}