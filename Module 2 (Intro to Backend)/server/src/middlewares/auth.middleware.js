import ApiError from "../utils/ApiError.js";
import asyncHanlder from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const verifyJWT = asyncHanlder (async (req, res, next) => {
    try {
        
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        

        if(!token) {
            throw new ApiError(400, "token hai he nahi");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user) {
            throw new ApiError(400, "ghalat token hai.");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(400, error?.message || "Ghalat token bhaija hai ap nay.");
    }
})

export default verifyJWT;