import express from "express";
import {
  AllConversation,
  AllUser,
  CreateConversation,
} from "../controller/conversationController.js";
import { ProtectedRoute } from "../middleware/authCheck.js";

const conversationRouter = express.Router();

conversationRouter.get("/allconversation", ProtectedRoute, AllConversation);
conversationRouter.get("/alluser/:role", ProtectedRoute, AllUser);
conversationRouter.post("/createconversation", ProtectedRoute, CreateConversation);

export default conversationRouter;
