import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chat from "./routes/chat.js";

const app=express();
const PORT=process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//so here it will like http://localhost:8080/chat/test
app.use("/api",chat);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
})


const connectDB=async()=>{
    
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to database");
    }
    catch(err){
        console.log(err);
        console.log("failed to connect to database");
    }
}

//shifted to utils/openai.js
// app.post("/test",async(req,res)=>{
//     const options={
//         method:"POST",
//         headers:{
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model:"gpt-4o-mini",
//             messages:{
//                 role:"user",
//                 content:req.body.message
//             }

//         })
//     }
//     try{
//         const response=await fetch("https://api.openai.com/v1/chat/completions",options);
//         const data=await response.json()
//         console.log(data);
//         res.send(data);
//     }
//     catch(err){
//         console.log(err);
//     }

// })

