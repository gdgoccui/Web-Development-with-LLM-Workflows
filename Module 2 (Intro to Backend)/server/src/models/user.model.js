import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema ({
    username: {
        type: String,
        lowercase: true,
        require: [true, "This field is requield."],
        index: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,
        require: true,
        unique: true,
    },
    dob: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    phoneNo: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    country: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    refreshToken: {
        type: String,
    }
}, {timestamps: true});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return next();
    };

    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign( {
        name: this.name,
        _id: this._id,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    } )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign( {
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    } )
};

const User = mongoose.model("User", userSchema);

export default User;