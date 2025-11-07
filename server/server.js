import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app=express()
dotenv.config()
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

app.get("/", (req, res) => {
    console.log("Working");
    res.json({
        body: {
            message: "Server working"
        },
        success: true
    })
})

await connectDb();
app.listen(5000, ()=> {console.log("Server working")})
