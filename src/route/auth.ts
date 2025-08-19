import express from "express";
import { IsLogginActive } from "../middleware/authCheck.js";
import { Login, Logout, Register } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);
authRouter.get("/checktoken", IsLogginActive);

export default authRouter;
