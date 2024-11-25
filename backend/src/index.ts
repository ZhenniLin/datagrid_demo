import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app = express();

app.use(cors({}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(7123, () => {
  console.log("Server running on http://localhost:7123/");
});

const MONGO_URL = process.env.MONGO_URL as string;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());
