const regUserSchema = require('../models/userModel')

const showUserProfile = async(req,res)=>{
    try {
        res.render("showUserProfile")
    } catch (error) {
        console.log(error);
    }
}

 

const fetchProfile = async(req,res)=>{
    try {
            const fetchUserId = req.session.user_id;
            const fetchUserData = await regUserSchema.findOne({_id:fetchUserId})
            
            res.render('showUserProfile', {user: fetchUserData})                                  
 
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    showUserProfile,
    fetchProfile
}

