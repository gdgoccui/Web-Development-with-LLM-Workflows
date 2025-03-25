import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHanlder from "../utils/asyncHandler.js";

// functin for generating tokens
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        
        const myUser = await User.findById(userId);

        const accessToken = myUser.generateAccessToken();
        const refreshToken = myUser.generateRefreshToken();

        myUser.refreshToken = refreshToken;
        await myUser.save({validateBeforeSave: false});

        return {accessToken, refreshToken};


    } catch (error) {
        throw new ApiError(500, "token can't be generated");
    }
}

// signup
const registerUser = asyncHanlder( async (req, res, next) => {
    // user ka data
    const {username, email, address, password, dob, country, city} = req.body;

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

    return res.status(200).json(
        new ApiResponse (200, user, "User registered.")
    )
});

// login
const loginUser = asyncHanlder( async (req, res, next) => {
    const {email, password} = req.body;

    if (!(email || password)) {
        throw new ApiError(400, "Email or password is missing");
    }

    const user = await User.findOne({email});

    if (!user || ! (await bcrypt.compare(password, user.password))) {
        throw new ApiError(400, "user not find or wrong password");
    }

    const {accessToken, refreshToken} = generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        }, "User has been loggedin.")
    )
});


// logout
const logoutUser = asyncHanlder(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {new: true});

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "user logged out successfully.")
    )
});

// accountDeletion
const deleteUser = asyncHanlder ( async (req, res, next) => {
    await User.findByIdAndDelete(req.user._id);

    res.clearCookie("accessToken");

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "user account deleted successfully")
    )
});

// update Password
const updatePassword = asyncHanlder (async (req, res, next) => {
    const {oldPassword, newPassword} = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "old password or new password is missing");
    }

    const user = await User.findById(req.user._id).select("+password");

    const arePasswordsCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!arePasswordsCorrect) {
        throw new ApiError(400, "old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res
    .status(200)
    .json(new ApiResponse(200, user, "password has been updated"))
});

// updateUsername
const updateUsername = asyncHanlder ( async (req, res, next) => {
    const {username} = req.body;

    if (!username) {
        throw new ApiError (400, "username is required")
    }

    req.user.username = username;
    await req.user.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "Username has been updated.")
    )
});

// getCurrUser
const getCurrentUser = asyncHanlder(  async (req, res, next) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "User details fetched successfully.")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    updatePassword,
    updateUsername,
    getCurrentUser,
}



// updateFullName
// updateCountry
// updateCity
// updatePhoneNo.
// updateDOB
// updateAddress
//updateEmail

// to do in free time
// forgetPassword (node mailer)
// profilePic (multer, aws/cloudinary)

