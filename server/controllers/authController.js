import { User } from "../models/User";
import { createAccessToken, createRefreshToken } from "../utils/tokenUtils";
import jwt from "jsonwebtoken";

export const SignUp = async(req, res) => {
    try{
    const {username, password}=req.body
    const hashedPassword=await bcrypt.hash(password, 10);

    const user=new User({
        username,
        password: hashedPassword
    })

    await user.save();
    const access_token=createAccessToken(username);
    const refresh_token=createRefreshToken(username);

    res.status(201).json({
        body: {
            message: "User successfully created",
            access_token,
            refresh_token
        },
        success: true
    })
    }
    catch(err) {
        res.json({
            body: {
                message: err.message
            },
            success: false
        })
    }
}

export const LogIn = async (req, res) => {
    const {username, password}=req.body;

    const user=await User.findOne(username);
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

    const passwordMatched=bcrypt.compare(password, user.password);
    if (!passwordMatched)
    {
        res.status(400).json({
            body:
            {
                message: "Invalid password"
            },
            success: false
        })
    }

    res.status().json({
        body:
        {
            message: "User successfully logged in"
        },
        success: true
    })
}

export const refreshAccessToken = async(req, res) => {
    const {token} = req.body;
    if (!token)
    {
        res.status(400).json({
            body: {
                message: "Missing token"
            },
            success: false
        })
    }

    try {
        const decoded=jwt.verify(token, process.env.refresh_access_token);
        const {username}=decoded;

        const user=User.findOne(username)
        access_token=createAccessToken(username)
        refresh_token=createRefreshToken(username)
        
        res.json({
            body : {
                message: "Access token successfully refreshed",
                access_token,
                refresh_token
            },
            success: false
        })
    }
    catch (err)
    {
        res.json({
            body: {
                message: err.message,
                token
            },
            success: false
        })
    }

    
}
