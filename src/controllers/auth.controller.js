import userModel from "../models/user.model.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import asyncHandler from "../middlewares/async.js";
import { sendTokenResponse } from "../helpers/index.js";
import { StatusCodes } from "http-status-codes"

//@description: Register new user
//@return:  JSON Web Token
//@route:   POST /api/auth/register
//@access:  Public
export const register = asyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body;
    //create user
    const user = await userModel.create({ name, email, password });

    await user.save();

    //send token
    sendTokenResponse(user, StatusCodes.CREATED, res);
});

//@description: Login User
//@return:  JSON Web Token
//@route:   POST /api/auth/login
//@access:  Public
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(
            new ErrorResponse(`Please provide your email and password`, StatusCodes.BAD_REQUEST)
        );
    }

    // Check user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorResponse(`Invalid Credentials: User does not exist.`, StatusCodes.UNAUTHORIZED));
    }

    // Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse(`Invalid Credentials: wrong password.`, StatusCodes.UNAUTHORIZED));
    }

    sendTokenResponse(user, StatusCodes.OK, res);
});

//@description: Logout user
//@return:  empty object
//@route:   GET /api/auth/logout
//@access:  Public
export const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(StatusCodes.ACCEPTED).json({ success: true, data: {} });
});


//@description: Get current logged in user
//@return:  User data
//@route:   POST /api/v1/auth/me
//@access:  Private
export const getMe = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user.id).select("-password");

    res.status(StatusCodes.OK).json({ success: true, data: user });
});
