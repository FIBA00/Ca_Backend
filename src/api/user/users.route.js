import express from "express";

import { userCurrent } from "./users.ctrl.js";
import inputValidationBody from "../../middlewares/validation.middleware.js";
import respondWith from "../../middlewares/response.middleware.js";
import { isLoggedIn } from "../../middlewares/auth.middleware.js";

const userRoute = express.Router();

userRoute.get("/me", isLoggedIn, respondWith(UserProfile), userCurrent);

export default userRoute;
