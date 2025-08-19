import jwt from "jsonwebtoken";
import User from "../model/userShema.js";
export const IsLogginActive = async (req, res) => {
    try {
        const token = req.cookies.jwttoken;
        if (!token) {
            return res.status(400).send({
                success: false,
                message: "Unauthorise",
            });
        }
        const userId = jwt.verify(token, process.env.JWTSECRET_KEY);
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "Unauthorise",
            });
        }
        const user = await User.findById(userId);
        user.password = undefined;
        if (user) {
            user._id.toString();
            return res.status(200).send({
                success: true,
                message: "Login is Active",
                data: user,
                token: token,
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Unauthorise",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "ann error occured",
        });
    }
};
export const ProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        if (!token) {
            return res.status(400).send({
                success: false,
                message: "Unauthorise access",
            });
        }
        const userId = jwt.verify(token, process.env.JWTSECRET_KEY);
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "Unauthorise access",
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Unauthorise access",
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "AN error occured",
        });
    }
};
