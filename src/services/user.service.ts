import { DocumentDefinition } from "mongoose";
import UserModel, { IUser } from "../models/user.model";

export async function createUser(input: DocumentDefinition<Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>>) {
  try {
    return await UserModel.create(input)
  } catch (error: any) {
    throw new Error(error)
  }
}