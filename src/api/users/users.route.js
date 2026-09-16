import express from "express";

import inputValidationBody from "../../middlewares/validation.middleware.js";
import respondWith from "../../middlewares/response.middleware.js";
import { isLoggedIn } from "../../middlewares/auth.middleware.js";
import {
  userCurrent,
  userLogin,
  userProfile,
  userSignup,
} from "./users.ctrl.js";
import { UserCreate, UserLogin, UserProfile } from "./users.schema.js";

const userRoute = express.Router();

userRoute.get("/me", isLoggedIn, respondWith(UserProfile), userCurrent);
userRoute.get("/me/:id", isLoggedIn, respondWith(UserProfile), userProfile);
userRoute.post("/signup", inputValidationBody(UserCreate), userSignup);
userRoute.post("/login", inputValidationBody(UserLogin), userLogin);

export default userRoute;
