import express, { Express, Request, Response } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/user.schema";
console.log('dsalfdsl')
function routes(app: Express) {
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
}

export default routes;