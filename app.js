import process from "node:process";
import "./src/utils/env.js";
import ExpressServer from "./src/server.js";
import RegisterRoutes from "./src/routes/main.js";

export default new ExpressServer()
  .router(RegisterRoutes)
  .listen(process.env.PORT);
