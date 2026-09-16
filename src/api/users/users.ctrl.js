import { eq } from "drizzle-orm";
import { database } from "../database/database.js";
import { users } from "../database/models.js";
import bcrypt from "bcrypt";
import {
  generateToken,
  comparePassword,
  setAuthCookie,
} from "../middlewares/auth.middleware.js";

export async function userCurrent(req, res) {}

export async function userProfile(req, res) {}

export async function userSignup(req, res) {}
export async function userLogin(req, res) {}
