import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import process from "node:process";


const app = express();
const PORT = process.env.PORT;
const CLIENT = process.env.CLIENT_URL
app.use( cors( {
	origin: CLIENT, 
	credentials: true,
} ) );
app.use( cookieParser() );
app.use( express.json( {
	limit: "10mb"
} ) );
app.use( express.urlencoded( {
	limit: "10mb",
	extended: true 
} ) );
app.use