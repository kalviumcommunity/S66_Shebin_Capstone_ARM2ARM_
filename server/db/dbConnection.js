const mongoose=require("mongoose")

const DbConnection=async()=>{
    await mongoose.connect(process.env.mongoURL)
        .then(() => console.log("MongoDB connected successfully"))
        .catch((error)=> console.log("Failed to connect to MongoDB:", error.message))
}

module.exports=DbConnection