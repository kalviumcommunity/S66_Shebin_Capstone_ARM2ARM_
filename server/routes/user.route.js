const express=require("express")
const {User}=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { error } = require("console")

const userRouter=express.Router()


// userRouter.get("/", async (req, res) => {
//     try {
//         const {email}=req.params

//         const users = await User.find({email})

//         if (users.length === 0) {
//             return res.status(404).json({ error: "No users found!" });
//         }

//         res.status(200).json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error. Please try again later." });
//     }
// });


// userRouter.post("/register",async(req,res)=>{
//     try {
//         const {name,email,password,bloodType,termsAccepted}=req.body
//         if(!name||!email||!password||!bloodType||!termsAccepted === undefined){
//             return res.status(400).json({error:"All fields are required!!"})
//         }

//         const existingUser=await User.findOne({email})
//         if (existingUser){
//             return res.status(400).json({ error: "Email already in use!" })
//         }
    
//         const hashedPassword=await bcrypt.hash(password,10)
    
//         const newUser=new User({name,email,password:hashedPassword,bloodType,termsAccepted})
//         await newUser.save()
//         res.status(201).json({message:"User regitered successfully!",userId:newUser._id})

//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: "Server error. Please try again later." })
//     }
    
// })

userRouter.get("/", async (req, res) => {
    try {
      if (req.query.email) {
        // If email is provided, fetch a single user
        const user = await User.findOne({ email: req.query.email });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
      } else {
        // If no email is provided, fetch all users
        const users = await User.find();
        res.status(200).json(users);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

userRouter.post("/ProfileData",async(req,res)=>{
    try {
        const {name,email,age,location,weight,bloodType,contactNumber,requested_type}=req.body
        if(!name||!email||!age||!location||!weight||!bloodType||!contactNumber||!requested_type === undefined){
            return res.status(400).json({error:"All fields are required!!"})
        }

        const existingUser=await User.findOne({email})
        if (existingUser){
            return res.status(400).json({ error: "Email already in use!" })
        }
    
        const newUser=new User({name,email,age,location,weight,bloodType,contactNumber,requested_type})
        await newUser.save()
        res.status(201).json({message:"User Profile successfully!",userId:newUser._id, Data:newUser})

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
        res.cookie("token",token,{
            httpOnly:true,
            secure:false
        }).json({ message: "Login successful", user: { name: user.name, email: user.email, userId: user._id } });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error. Please try again later." });
    }
})


// userRouter.post("/logout",(req,res)=>{
//     res.clearCookie("token").json({ message: "Logged out" })
// })

userRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age, location, weight, bloodType,contactNumber,requested_type} = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,
        { name, email, age, location, weight, bloodType,contactNumber,requested_type},{ new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({message: "User profile updated successfully!",updatedUser,});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update user. Please try again later." });
        }
    });

module.exports={userRouter}