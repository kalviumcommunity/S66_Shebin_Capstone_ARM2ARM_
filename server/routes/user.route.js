const express=require("express")
const {User}=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { error } = require("console")

const userRouter=express.Router()


userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find()

        if (users.length === 0) {
            return res.status(404).json({ error: "No users found!" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});


userRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,password,bloodType,termsAccepted}=req.body
    
        if(!name||!email||!password||!bloodType||!termsAccepted === undefined){
            return res.status(400).json({error:"All fields are required!!"})
        }
    
        const existingUser=await User.findOne({email})
        if (existingUser){
            return res.status(400).json({ error: "Email already in use!" })
        }
    
        const hashedPassword=await bcrypt.hash(password,10)
    
        const newUser=new User({name,email,password:hashedPassword,bloodType,termsAccepted})
        await newUser.save()
        res.status(201).json({message:"User regitered successfully!",userId:newUser._id})

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error. Please try again later." })
    }
    
})


userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({ error: "Email and password are required!" })
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        const token=jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).json({message:"Login Successful",token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                bloodType: user.bloodType
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error. Please try again later." });
    }
})


module.exports={userRouter}