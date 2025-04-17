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
    password: {
      type: String,
      required: true,
      min: 6,
    },
    bloodType: {
      type: String,
      required: true,
      enum: BloodTypeEnums,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User-Blood", userSchema);
module.exports = {
  User,
};
