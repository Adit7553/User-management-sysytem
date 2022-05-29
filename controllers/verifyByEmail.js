const regUserSchema = require('../models/userModel')
const nodemailer = require('nodemailer')


//route user verify after verify by user
const verifyMail = async(req,res)=>{
   try {
     const updatedInfo = await regUserSchema.updateOne({_id:req.query.id},{$set:{is_verified:1}})
     res.render("email-verified")
   } catch (error) {
       console.log(error);
   }
}

module.exports = {
    verifyMail
}