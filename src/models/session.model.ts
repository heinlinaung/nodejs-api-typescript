import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { IUser } from "./user.model";

export interface ISession extends mongoose.Document {
  userId: IUser['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  valid: {
    type: Boolean,
    default: true
  },
  userAgent: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const SessionModel = mongoose.model("Session", sessionSchema)

export default SessionModel;