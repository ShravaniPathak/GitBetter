import mongoose, {Schema} from "mongoose";

const user = new Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}) 

export const User=mongoose.model('User', user);