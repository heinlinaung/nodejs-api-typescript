import { Request, Response } from 'express';
import logger from '../utils/logger';
import { validatePassword } from '../services/user.service';
import { createSession, findUserSessions, deleteUserSession } from '../services/session.service';
import { signJwt } from '../utils/jwt';
import config from 'config';
export async function createSessionHandler(req: Request, res: Response) {
  try {
    // validate user password and create a session
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).send('Invalid email or password')
    }

    const session = await createSession(user._id, req.get('User-Agent') || '');
    const accesstoken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTTL') });
    const refreshtoken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('refreshTokenTTL') });

    return res.send({ accesstoken, refreshtoken })
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message)
  }
}

export async function getUserSessionHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const sessions = await findUserSessions({ userId, valid: true });
    return res.send(sessions)
  } catch (error: any) {
    logger.error(error);
    res.end()
  }
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  try {
    const sessionId = res.locals.user.session;
    const sessions = await deleteUserSession({ _id: sessionId }, { valid: false });
    return res.send({
      accesstoken: null,
      refreshtoken: null,
    })
  } catch (error: any) {
    logger.error(error);
    res.end()
  }
}
