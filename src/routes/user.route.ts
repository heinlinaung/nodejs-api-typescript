import express, { Express, Request, Response } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/user.schema";
import { createSessionSchema } from "../schemas/session.schema";
import { createSessionHandler } from "../controllers/session.controller";
import { getUserSessionHandler } from "../controllers/session.controller";
import requiredAuth from "../middlewares/requiredAuth";
console.log('dsalfdsl')
function routes(app: Express) {
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);
  app.get("/api/sessions", requiredAuth, getUserSessionHandler);
}

export default routes;