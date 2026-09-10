const express = require('express');
const smsRouter=express.Router()
const { authenticate } = require("../middleware/authentication")
const client=require("twilio")(process.env.TWILIO_ACC_SID, process.env.TWILIO_AUTH_TOKEN)

smsRouter.post("/sendSms", authenticate, async(req,res)=>{
    const {message,to}=req.body
    const recipient = to || process.env.TO_NUMBER
    const from = process.env.TWILIO_FROM_NUMBER
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID

    if (!message || !recipient) {
        return res.status(400).json({ success: false, error: "Both 'message' and 'to' are required." })
    }

    if (!from && !messagingServiceSid) {
        return res.status(500).json({
            success: false,
            error: "SMS sender is not configured. Set TWILIO_FROM_NUMBER or TWILIO_MESSAGING_SERVICE_SID in server/.env."
        })
    }

    try {
        const msg=await client.messages.create(
            messagingServiceSid
                ? {
                    messagingServiceSid,
                    to: recipient,
                    body: message,
                }
                : {
                    from,
                    to: recipient,
                    body: message,
                }
        )

        res.status(200).json({success: true, sid: msg.sid})
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            error: error.message,
            code: error.code,
        });
    }
})

module.exports={smsRouter}