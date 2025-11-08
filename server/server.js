import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import habitRoutes from './routes/HabitRoutes.js'

dotenv.config()
const app=express()
const db_url=process.env.db_url;

const connectDb= async() => {
    try {
        await mongoose.connect(db_url);
        console.log("DB connected successfully")
    }
    catch (err) {
        console.log(err);
    }
}

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    console.log("Working");
    res.json({
        body: {
            message: "Server working"
        },
        success: true
    })
})

app.use("/auth",authRoutes);
app.use("/habit",habitRoutes);

await connectDb();
app.listen(5000, ()=> {console.log("Server working")})
