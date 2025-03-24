import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHanlder from "../utils/asyncHandler";

// signup
const registerUser = asyncHanlder( async (req, res, next) => {
    // user ka data
    const {username, email, address, password, dob, country, city}= req.body;

    // data thek hai ya khrab hai
    if ([username, email, address, password, dob, country, city].some((i) => i?.trim()==="")) {
        throw new ApiError(400, "some fields are empty");
    }

    // user email and username verification
    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if (existingUser) {
        throw new ApiError(400, "Username or Email already taken.");
    }

    // database main user create kro
    const newUser = await User.create({
        username, email, address, password, dob, country, city
    });

    // req main user add kr do
    const user = await User.findById(newUser._id).select("-password, -refreshToken");

    if(!user) {
        throw new ApiError(500, "User save ni ho ska.");
    }
} )
// login

// logout

// accountDeletion

// forgetPassword

// updateName