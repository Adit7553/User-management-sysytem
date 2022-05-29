const regUserSchema = require('../models/userModel')
const bcrypt = require('bcrypt')



/// to load login page
const loadLoginPage = async(req,res)=>{
    try {
        res.render("login")
    } catch (error) {
        console.log(error);
    }
}
// to load welcome page 
const welcomePage = async(req,res)=>{
    try {
        res.render("welcomePage")
    } catch (error) {
     console.log(error);   
    }
}

//to load user logout page

const userLogout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
    }
}
const verifyLoginUser = async(req,res)=>{
    try {
        //to secure password , we are using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const password = hashedPassword;
        // we will find user enterd email in the database and store it in a variable 
        const loginUserData = await regUserSchema.findOne({email})
       // console.log(loginUserData);
        //to check that email found in database or not
         if(loginUserData){
            const PasswordChecking = await bcrypt.compare(req.body.password, loginUserData.password)
            console.log(PasswordChecking);
            if(PasswordChecking){
               if(loginUserData.is_verified === 0){
                  res.render("login", {message: "please verify your email before login"})
               }else{
                   req.session.user_id = loginUserData._id
                   res.redirect("welcomePages")
               }
            }else{
                res.render("login", {message: "incorrect password"})
            }
         }else{
             res.render("login", {message: "This email is not exist in out database"})
         }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    loadLoginPage,
    welcomePage,
    userLogout,
    verifyLoginUser
    //loginUserData
}