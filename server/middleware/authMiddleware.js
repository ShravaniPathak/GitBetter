import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../controllers/authController.js";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const refreshToken = req.headers['x_refresh_token'];
    let decoded={username: ""};

    if (!authHeader && !refreshToken) {
      return res.status(401).json({ body: { message: "No tokens provided" }, success: false });
    }

    let access_token = authHeader?.split(" ")[1];

    try {
      decoded = jwt.verify(access_token, process.env.access_token_secret);
      req.user =await User.findOne({username: decoded.username});
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const tokens = await refreshAccessToken(refreshToken);

        if (!tokens.body.access_token) {
          return res.status(401).json({ body: { message: "Refresh token invalid" }, success: false });
        }

        decoded = jwt.verify(tokens.body.access_token, process.env.access_token_secret);
        req.user=await User.findOne({username: decoded.username});

        next();
    } else {
        return res.status(401).json({ body: { message: err.message }, success: false });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ body: { message: "Server error" }, success: false });
  }
};

