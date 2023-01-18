import express, { Express, Request, Response } from "express";
import requiredAuth from "../middlewares/requiredAuth";

import { createUserHandler } from "../controllers/user.controller";
import {
  createSessionHandler
  , getUserSessionHandler
  , deleteUserSessionHandler
} from "../controllers/session.controller";

import validateResource from "../middlewares/validateResource";

import { createUserSchema } from "../schemas/user.schema";
import { createSessionSchema } from "../schemas/session.schema";

function routes(app: Express) {
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);
  app.get("/api/sessions", requiredAuth, getUserSessionHandler);
  app.delete("/api/sessions", requiredAuth, deleteUserSessionHandler);
}

export default routes;