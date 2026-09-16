import { eq } from "drizzle-orm";
import { database } from "../database/database.js";
import { users } from "../database/models.js";
import bcrypt from "bcrypt";
import {
	generateToken,
	comparePassword,
	setAuthCookie
} from "../middlewares/auth.middleware.js";
