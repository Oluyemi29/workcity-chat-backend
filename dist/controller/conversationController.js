import Conversation from "../model/conversationSchema.js";
import User from "../model/userShema.js";
export const AllConversation = async (req, res) => {
    try {
        const Method = req.method;
        if (Method !== "GET") {
            return res.status(400).send({
                success: false,
                message: "Method is not allow",
            });
        }
        const conversation = await Conversation.find();
        return res.status(200).send({
            success: true,
            message: "All conversation gotten",
            data: conversation,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
export const AllUser = async (req, res) => {
    try {
        const Method = req.method;
        const roleParams = req.params.role;
        if (Method !== "GET") {
            return res.status(400).send({
                success: false,
                message: "Method is not allow",
            });
        }
        const users = await User.find({
            role: roleParams === "customer" ? { $ne: "customer" } : "customer",
        }).select("-password");
        return res.status(200).send({
            success: true,
            message: "All users gotten",
            data: users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
export const CreateConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        if (!senderId || !receiverId) {
            return res.status(400).send({
                success: false,
                message: "All field are required",
            });
        }
        const existConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId], $size: 2 },
        });
        if (existConversation) {
            return res.status(200).send({
                success: true,
                message: "Conversation exist already",
                data: existConversation,
            });
        }
        if (!existConversation) {
            const conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
            if (conversation) {
                return res.status(200).send({
                    success: true,
                    message: "Conversation created successfully",
                    data: conversation,
                });
            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "Error when creating conversation",
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occured",
        });
    }
};
