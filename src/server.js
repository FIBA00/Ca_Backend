import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import process from "node:process";
import bodyParser from "body-parser";
import os from "os";

// ! internal imports
import log from "./utils/logger.js"
import errorHandler from "./middlewares/error_handler.js";

const app = express();

// env
const PORT = process.env.PORT;
const CLIENT = process.env.CLIENT_URL;
const REQUEST_LIMIT = process.env.REQUEST_LIMIT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const NODE_ENV = process.env.NODE_ENV;

export default class ExpressServer {
  constructor() {
    app.use(
      cors({
        origin: CLIENT || "*",
        credentials: true,
      }),
    );
    app.use(
      bodyParser.json({
        limit: REQUEST_LIMIT || "100kb",
      }),
    );
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: REQUEST_LIMIT || "100kb",
      }),
    );
    app.use(
      bodyParser.text({
        limit: REQUEST_LIMIT || "100kb",
      }),
    );
    app.use(cookieParser(SESSION_SECRET));
  }
  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = PORT) {
    app.listen(function logServer() {
      log.info(
        `App is up and running in ${NODE_ENV || "development"} @: ${os.hostname()} on port: ${port}`,
      );
    });
    return app;
  }
}
