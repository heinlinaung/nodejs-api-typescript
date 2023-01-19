import express, { Express, Request, Response } from "express";
import requiredAuth from "../middlewares/requiredAuth";

import {
  findProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler
} from "../controllers/product.controller";

import validateResource from "../middlewares/validateResource";

import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductSchema
} from "../schemas/product.schema";

function routes(app: Express) {
  app.get("/api/products/:productId", [requiredAuth, validateResource(getProductSchema)], findProductHandler);
  app.post("/api/products", [requiredAuth, validateResource(createProductSchema)], createProductHandler);
  app.put("/api/products/:productId", [requiredAuth, validateResource(updateProductSchema)], updateProductHandler);
  app.delete("/api/products/:productId", [requiredAuth, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default routes;