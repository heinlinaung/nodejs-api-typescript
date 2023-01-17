import express, { Express, Request, Response } from "express";
function routes(app: Express) {
  app.get("/server-status", (req: Request, res: Response) => {
    res.send("Server is up and running!! :)");
  });
}

export default routes;