import  jwt from "jsonwebtoken";

export const createAccessToken = username => {
    return jwt.sign({username}, process.env.access_token_secret, {expiresIn : '1h'})
}

export const createRefreshToken = username => {
    return jwt.sign({username}, process.env.refresh_token_secret, {expiresIn : '90d'})
}