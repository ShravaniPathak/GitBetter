import { User } from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export const SignUp = async(req, res) => {
    try{
    const {email, username, password}=req.body;
    const userExists=await User.findOne({username})
    if (userExists) {
        return res.json({
            body: {
                message: "Username already exists",
            },
            success: false
        })
    }
    const emailExists=await User.findOne({email})
    if (emailExists) {
        return res.json({
            body: {
                message: "Email already exists"
            },
            success: false
        })
    }
    const hashedPassword=await bcrypt.hash(password, 10);

    const user=new User({
        email,
        username,
        password: hashedPassword
    })

    await user.save();
    const access_token=createAccessToken(username);
    const refresh_token=createRefreshToken(username);

    return res.status(201).json({
        body: {
            message: "User successfully created",
            access_token,
            refresh_token,
        },
        success: true
    })
    }
    catch(err) {
        console.log(err);
        return res.json({
            body: {
                message: err.message
            },
            success: false
        })
    }
}

export const LogIn = async (req, res) => {
    console.log("Log in function called")
    const {username, password}=req.body;

    const user=await User.findOne({username});
    if (!user)
    {
        return res.status(404).json({
            body:
            {
                message: "User not found"
            },
            success: false
        })
    }

    const passwordMatched=await bcrypt.compare(password, user.password);
    if (!passwordMatched)
    {
        return res.status(400).json({
            body:
            {
                message: "Invalid password",
            },
            success: false
        })
    }

    const access_token=createAccessToken(username);
    const refresh_token=createRefreshToken(username);

    res.status(200).json({
        body:
        {
            message: "User successfully logged in",
            access_token,
            refresh_token,
        },
        success: true
    })
}

export const refreshAccessToken = async(refresh_token) => {
    console.log("Refresh Token"+refresh_token);
    if (!refresh_token)
    {
        return {
            body: {
                message: "Missing token"
            },
            success: false
        }
    }

    try {
        console.log("Refresh token secret : "+process.env.refresh_token_secret);

        const decoded=jwt.verify(refresh_token, process.env.refresh_token_secret);
        const {username}=decoded;

        const user=await User.findOne({username});
        if (!user)
        {
            return {
                body: {
                    message: "User not found"
                },
                success: false
            }
        }

        const access_token=createAccessToken(username)
        refresh_token=createRefreshToken(username)
        
        return {
            body : {
                message: "Access token successfully refreshed",
                access_token,
                refresh_token
            },
            success: true
        }
    }
    catch (err)
    {
        console.log(err);
        return {
            body: {
                message: err.message,
                refresh_token
            },
            success: false
        }
    }  
}

export const implementRefreshAccessToken = async (req, res) => {
    console.log(req.headers);
    const token=req.headers.x_refresh_token;
    const result=await refreshAccessToken(token)
    res.json(result);
}

