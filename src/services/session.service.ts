import { get } from 'lodash'
import config from 'config';
import { FilterQuery } from 'mongoose'
import SessionModel, { ISession } from '../models/session.model'
import { verifyJwt, signJwt } from '../utils/jwt'
import { findUser } from './user.service'

export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await SessionModel.create({ userId, userAgent })
    return session.toJSON()
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function findUserSessions(query: FilterQuery<ISession>) {
  return await SessionModel.find(query).lean()
}

export async function deleteUserSession(query: FilterQuery<ISession>, update: FilterQuery<ISession>) {
  return await SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken({ refreshtoken }: { refreshtoken: string; }) {
  const { decoded } = verifyJwt(refreshtoken)

  if (!decoded || !get(decoded, 'session')) return false

  const session = await SessionModel.findById(get(decoded, 'session'))
  if (!session || !session.valid) return false

  const user = await findUser({ _id: session.userId })
  if (!user) return false

  const accesstoken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTTL') });
  return accesstoken
}