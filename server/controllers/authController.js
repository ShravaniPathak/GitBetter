import { User } from "../models/User";

export const SignUp = async(req, res) => {
    const {username, password}=req.body
    const hashedPassword=await bcrypt.hash(password, 10);

    const user=new User({
        username,
        password: hashedPassword
    })

    await user.save();

    res.status(201).json({
        body: {
            message: "User successfully created"
        },
        success: true
    })
}

