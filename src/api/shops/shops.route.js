import express from "express";

import inputValidationBody from "../../middlewares/validation.middleware.js";
import respondWith from "../../middlewares/response.middleware.js";

import { isLoggedIn, requireRole } from "../../middlewares/auth.middleware.js";


const shopsRoute = express.Router();

shopsRoute.get("/", isLoggedIn, requireRole("owner"), respondWith(OwnerShopListResponse), getUserShops)

export default shopsRoute;
