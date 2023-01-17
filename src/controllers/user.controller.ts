import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createUser } from '../services/user.service';

export async function createUserHandler(req: Request, res: Response) {
  logger.info('createUserHandler');
  try {
    const user = await createUser(req.body);
    return user
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message)
  }
}