import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import conversationRouter from "./route/conversationRoute.js";
import messageRouter from "./route/messageRoute.js";
import { app, server } from "./lib/server.js";
import authRouter from "./route/auth.js";
import ConnectDB from "./connect/ConnectDb.js";

dotenv.config();
await ConnectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FrontendUrl as string,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));

app.use("/api", authRouter);
app.use("/api", conversationRouter);
app.use("/api", messageRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`you are on port ${PORT}`);
});
