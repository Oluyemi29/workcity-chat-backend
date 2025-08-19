import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userShema.js";

export const Register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send({
        success: false,
        message: "User already exist, kindly login",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const nameNeeded = username.includes(" ")
      ? username.split(" ")[0]
      : username;
    const image = `https://api.dicebear.com/9.x/avataaars/svg?seed=${nameNeeded}`;
    const user = await User.create({
      email,
      username,
      image,
      password: hashPassword,
    });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "registered successfully",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Error when registering user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "account not found, kindly registered first",
      });
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).send({
        success: false,
        message: "incorrect password",
      });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWTSECRET_KEY as string,
      { expiresIn: "7d" }
    );

    res.cookie("jwttoken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "login successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwttoken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
    });
    return res.status(200).send({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};
