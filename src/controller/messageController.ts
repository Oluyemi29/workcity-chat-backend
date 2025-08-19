import { Request, Response } from "express";
import Message from "../model/messageSchema.js";

export const GetMessages = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversation;
    const message = await Message.find({ conversationId });
    return res.status(200).send({
      success: true,
      message: "All messages gotten",
      data: message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occured",
    });
  }
};
