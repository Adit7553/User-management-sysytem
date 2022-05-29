const regUserSchema = require('../models/userModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')





// to load forget password page

const forgetPassword = async(req,res)=>{
    try {
        res.render('forget')
    } catch (error) {
        console.log(error.message);
    }
}

// to load reset password page
const goForResetPage = async(req,res)=>{
    try {
        res.render("resetPage")
    } catch (error) {
     console.log(error);   
    }
}

// to load resetVerified page when user click on reset  link
const resetVerified = async(req,res)=>{
    try {
        res.render("resetVerified")
    } catch (error) {
        console.log(error);
    }
}

// for send reset password link user we create a function 
const  sendResetMail = async(email, user_id)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'alberta.heller79@ethereal.email',
                pass: 'vrNUnVTvufuxZE2ygY'
            }
        });
       
        const mailMessage ={
            from : 'antonina.armstrong93@ethereal.email',
            to : email,           
            subject : "This mail is for reset your password",
            html: '<p> Hello, please click here to <a href= "http://127.0.0.1:8080/resetVerified""> Reset </a>your password</P>'
        }
        transporter.sendMail(mailMessage, function(err,info){
            if(err){
                console.log(err);
            }else{
                console.log("email for reset password sent successfully", info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}

const resetPassword = async(req,res)=>{
    try {
        const email = req.body.resetEmail;
        const resetUser = await regUserSchema.findOne({email:email})
        if(resetUser){
            sendResetMail(email, regUserSchema.user_id);
            res.render("forget", {message : "Email for verification successfully sent to your email id"})
        }else{
            res.render('forget', {message : "No account found from this email"})
        }
    } catch (error) {
        console.log(error);
    }
}



const resetResponse = async(req,res)=>{
    try {
        const email = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)
        //check email in database
          const emailResult = await regUserSchema.findOne({email})
          if(emailResult){
                     const updatedPassword = await regUserSchema.updateOne({password:emailResult.password}, {$set:{password: hashedPassword}});
                     if(updatedPassword){
                        res.render("login",{message:"Password changed"})
                       console.log("password updated");
                     }     
          }else{
              res.render('resetPage', {message:"Invalid user, please check your email again."})
          }
    } catch (error) {
        console.log("error");
    }
}


 
module.exports = {
    resetPassword,
    forgetPassword,
    goForResetPage,
    resetResponse,
    resetVerified
}
