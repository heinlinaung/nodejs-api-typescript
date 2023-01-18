import { Request, Response, NextFunction } from "express";

const requiredAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!res.locals.user) { return res.status(401).send('Unauthorized') }
    next()
  } catch (error: any) {
    return res.status(400).send(error.errors)
  }
}

export default requiredAuth;