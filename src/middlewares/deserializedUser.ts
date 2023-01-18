import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { get } from 'lodash';
const deserializedUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accesstoken = get(req, "headers.authorization", "").replace("Bearer ", "");
    if (!accesstoken) return next()

    const { decoded } = verifyJwt(accesstoken)
    if (decoded) {
      res.locals.user = decoded
    }

    next()
  } catch (error: any) {
    return res.status(400).send(error.errors)
  }
}

export default deserializedUser;