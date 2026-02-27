const mongoose = require("mongoose")
const { default: BloodTypeEnums } = require("../enums/blood")

const bloodRequestSchema = new mongoose.Schema({

    requested_type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
        Enum: BloodTypeEnums
    },
    location: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
    }

}, { timestamps: true })


const BloodRequest = mongoose.model("Blood-Requests", bloodRequestSchema)
module.exports = { BloodRequest }