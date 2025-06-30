const express = require('express');
const smsRouter=express.Router()
const client=require("twilio")(process.env.TWILIO_ACC_SID, process.env.TWILIO_AUTH_TOKEN)

smsRouter.post("/sendSms",async(req,res)=>{
    const {message,to}=req.body
    try {
        const msg=await client.messages.create({
            from:process.env.TWILIO_FROM_NUMBER,
            to,
            body:message
        })

        res.status(200).json({success: true, sid: msg.sid})
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

module.exports={smsRouter}