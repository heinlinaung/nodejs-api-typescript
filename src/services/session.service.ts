import { FilterQuery } from 'mongoose'
import SessionModel, { ISession } from '../models/session.model'
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