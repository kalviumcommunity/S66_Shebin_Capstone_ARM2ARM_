const mongoose=require("mongoose")

const DbConnection=async()=>{
    let connection=mongoose.connect(process.env.mongoURL)
        .then(() => console.log("MongoDB connected successfully"))
        .catch(()=> console.log("Failed to connect to MongoDB:", error.message))
}

module.exports=DbConnection