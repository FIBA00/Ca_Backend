import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import process from "node:process";

// ! internal import
import "../configs/env.config.js";
import { database } from "../database/database.js";
import { users } from "../database/models.js";
import log from "../utils/logger.js";

const SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || "production";

export function setAuthCookie(res, token) {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: NODE_ENV,
    sameSite: "lax",
    maxAge: 2 * 60 * 60 * 1000,
  });
}

export function clearAuthCookie(res) {
  res.clearAuthCookie("accessToken");
}

export function generateToken(user) {
  try {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        tokenVersion: user.tokenVersion,
      },
      SECRET,
      { expiresIn: "2h" },
    );
  } catch (error) {
    log.error("Error while generating token: ", error.message);
  }
}

export function verifyToken ( token )
{
	try {
		if ( !SECRET )
		{
			throw new Error("JWT secret is missing. set JWT_SECRET in your .env file.")
		}
		return jwt.verify(token, SECRET)
	} catch (error) {
		log.error("Error while verifying token: ", error.message)
	}
}