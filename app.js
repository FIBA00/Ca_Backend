import process from "node:process";

// ! internal imports
import ExpressServer from "./src/server.js";
import RegisterRoutes from "./src/api/main.js";
import "./src/configs/env.config.js";

export default new ExpressServer()
  .router(RegisterRoutes)
  .listen(process.env.PORT);
