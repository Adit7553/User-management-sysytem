// we are using middleware by just creating middleware folder in  which we are creating auth.js by which we can not 
// go for login page by just putting /login in url
// so its the authentication for the user management system.



// **** we are creating two method for is login or is logout and is verified or not .

// its for checking that :
// 1. if you are going to register page then you have to isLogout
// 2.if you are going to login page or home page then you have to isLogout
// 3. if you are going to welcome page then you have to isLogin


const isLogin = async(req,res,next)=>{
    try {
        if(req.session.user_id){
        }else{
          res.redirect('/')
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}


const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
           res.redirect('/welcomePages')
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

// const isVerifiedForReset = async(req,res)=>{
//     try {
//         if
//     } catch (error) {
//         console.log(error);
//     }
// }


module.exports = {
    isLogin,
    isLogout
}