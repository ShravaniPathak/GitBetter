import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    const authHeader=req.header.authorization
    const token=authHeader && authHeader.split(" ")[1]

    if (!token)
    {
        return res.json({
            body: {
                message: "Token does not exist"
            },
            success: false
        })
    }

    const decoded=jwt.verify(token, process.env.access_token_secret);
    req.user=decoded;

    next();
}