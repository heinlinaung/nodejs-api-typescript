import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { get } from 'lodash';
import { reIssueAccessToken } from "../services/session.service";

const deserializedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accesstoken = get(req, "headers.authorization", "").replace("Bearer ", "");
    const refreshtoken = get(req, "headers.x-refresh") as string;

    if (!accesstoken) return next()

    const { decoded, expired } = verifyJwt(accesstoken)
    if (decoded) {
      res.locals.user = decoded
    }

    if (expired && refreshtoken) {
      const newaccesstoken = await reIssueAccessToken({ refreshtoken })
      if (newaccesstoken) {
        res.setHeader("x-access-token", newaccesstoken);
      }

      const result = verifyJwt(newaccesstoken as string);

      res.locals.user = result.decoded
    }

    next()
  } catch (error: any) {
    return res.status(400).send(error.errors)
  }
}

export default deserializedUser;