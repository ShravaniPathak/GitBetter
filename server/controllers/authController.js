import { User } from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export const SignUp = async(req, res) => {
    try{
    const {username, password}=req.body;
    const userExists=await User.findOne({username})
    if (userExists) {
        return res.json({
            body: {
                message: "Username already exists",
            },
            success: false
        })
    }
    const hashedPassword=await bcrypt.hash(password, 10);

    const user=new User({
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
            refresh_token
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
                message: "Invalid password"
            },
            success: false
        })
    }

    const access_token=createAccessToken(username);
    const refresh_token=createAccessToken(username);

    res.status(200).json({
        body:
        {
            message: "User successfully logged in",
            access_token,
            refresh_token
        },
        success: true
    })
}

export const refreshAccessToken = async(req, res) => {
    const {token} = req.body;
    if (!token)
    {
        return res.status(400).json({
            body: {
                message: "Missing token"
            },
            success: false
        })
    }

    try {
        const decoded=jwt.verify(token, process.env.refresh_token_secret);
        const {username}=decoded;

        const user=await User.findOne({username});
        if (!user)
        {
            return res.json({
                body: {
                    message: "User not found"
                },
                success: false
            })
        }

        const access_token=createAccessToken(username)
        const refresh_token=createRefreshToken(username)
        
        return res.json({
            body : {
                message: "Access token successfully refreshed",
                access_token,
                refresh_token
            },
            success: true
        })
    }
    catch (err)
    {
        console.log(err);
        return res.json({
            body: {
                message: err.message,
                token
            },
            success: false
        })
    }  
}

