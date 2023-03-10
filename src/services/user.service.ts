import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from 'lodash';
import UserModel, { IUser } from "../models/user.model";

export async function findUser(query: FilterQuery<IUser>) {
  return UserModel.findOne(query).lean()
}

export async function createUser(input: DocumentDefinition<Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>>) {
  try {
    const user = await UserModel.create(input)
    return omit(user.toJSON(), 'password')
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function validatePassword({ email, password }: { email: IUser['email'], password: string }) {
  try {
    const user = await UserModel.findOne({ email })
    if (!user) return false

    const isValid = await user.comparePassword(password)
    if (!isValid) return false

    return omit(user.toJSON(), 'password')
  } catch (error: any) {
    throw new Error(error)
  }
}

