import express from "express";
import { GetMessages } from "../controller/messageController.js";
import { ProtectedRoute } from "../middleware/authCheck.js";

const messageRouter = express.Router();

messageRouter.get("/messages/:conversation", ProtectedRoute, GetMessages);

export default messageRouter;
