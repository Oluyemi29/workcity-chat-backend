import express from "express";
import http from "http";
import { Server } from "socket.io";
import Message from "../model/messageSchema.js";
import Conversation from "../model/conversationSchema.js";
import dotenv from "dotenv";
const app = express();
const server = http.createServer(app);
dotenv.config();
const io = new Server(server, {
    cors: {
        origin: process.env.FrontendUrl,
        methods: ["GET", "POST"],
    },
});
const onlineUser = new Map();
io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);
    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
    });
    socket.on("addUser", (userId) => {
        onlineUser.set(userId, socket.id);
        io.emit("getOnlineUsers", [...onlineUser.keys()]);
    });
    socket.on("typing", ({ isTyping, userName, conversationId }) => {
        socket
            .to(conversationId)
            .emit("typing", { isTyping, userName, conversationId });
    });
    socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
        const message = await Message.create({ conversationId, senderId, text });
        await Conversation.findByIdAndUpdate(conversationId, { lastMessage: text });
        io.to(conversationId).emit("newMessage", message);
    });
    socket.on("editMessage", async ({ conversationId, messageId, newText, senderId }) => {
        const updateMessage = await Message.findByIdAndUpdate(messageId, {
            text: newText,
            edited: true,
            senderId: senderId,
        }, {
            new: true,
        });
        const getLastMessage = await Message.findOne({
            conversationId,
            deleted: false,
        })
            .sort({
            createdAt: -1,
        })
            .limit(1);
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: getLastMessage.text ?? "",
        });
        io.emit("messageEdited", updateMessage);
    });
    socket.on("deleteMessage", async ({ conversationId, messageId, senderId }) => {
        const deleteMessage = await Message.findByIdAndUpdate(messageId, {
            deleted: true,
            senderId: senderId,
        }, {
            new: true,
        });
        const getLastMessages = await Message.findOne({
            conversationId,
            deleted: false,
        })
            .sort({
            createdAt: -1,
        })
            .limit(1);
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: getLastMessages.text ?? "",
        });
        io.emit("messageDeleted", deleteMessage);
    });
    socket.on("disconnect", () => {
        [...onlineUser.entries()].forEach(([uid, sid]) => {
            if (sid === socket.id) {
                onlineUser.delete(uid);
            }
        });
        io.emit("getOnlineUsers", [...onlineUser.keys()]);
        console.log("User disconnected: " + socket.id);
    });
});
export { io, server, app };
