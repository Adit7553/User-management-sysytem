const regUserSchema = require('../models/userModel')
const bcrypt = require('bcrypt')



//********** */ to load Registration page to users

const loadRegisterPage = async(req,res)=>{
    try {
      res.render('registration')  
    } catch (error) {
        console.log(error.message);
    }
}

//for send mail to user for verify
const  sendVerifyMail = async(name, email, user_id)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'shaniya.leffler60@ethereal.email',
                pass: 'zffvXAd1jYfB1msJHH'
            }
        });
       
        const mailMessage ={
            from : 'antonina.armstrong93@ethereal.email',
            to : email,           
            subject : "This mail is for the verification",
            html: '<p> Hello  ' + name + ', please click here to <a href= "http://127.0.0.1:8080/verify?id='+user_id+'"">verify </a>your mail</P>'
        }
        transporter.sendMail(mailMessage, function(err,info){
            if(err){
                console.log(err);
            }else{
                console.log("email for verification sent successfully", info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}



// insert users in registraton form
const insertUser = async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userData = new regUserSchema({
            name : req.body.name,
            email : req.body.email,
            mobile : req.body.mobile,
            image : req.file.filename,
            password : hashedPassword,
            is_admin : 0
        });
        const UserSaved = await userData.save();
        
      if(UserSaved){
          // here we are specifing a method for verify email
          sendVerifyMail(req.body.name, req.body.email, UserSaved._id);

          res.render('registration', {message:"Your registration has been successfull, now please verify your email Id."})
      }else{
        res.render('registration', {message:"Oopss..!, your registration has not been successfull"})
      }

    } catch (error) {
        console.log(error);
    }
}



module.exports ={
    loadRegisterPage,
    insertUser,
    
}