const mongoose = require("mongoose");
const { type } = require("os");
const { default: BloodTypeEnums } = require("../enums/blood");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    requested_type:{
      type: String,
      required: true,
      enum: ["Donor", "Blood-Banks","Hospital","Recipient"]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
      required: true,
    },
    location:{
      type: String,
      required:true
    },
    weight: {
      type: Number,
      min: 45,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
      enum: BloodTypeEnums,
    },
    contactNumber: {
      type: String,
      required: true,
      minlength: 10
    },
    password: {
      type: String,
      select: false,
    },

    
    // bloodRequests: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Blood-Requests",
    // }]
    
  },
  { timestamps: true }
);

const User = mongoose.model("User-Blood", userSchema);
module.exports = {
  User,
};
