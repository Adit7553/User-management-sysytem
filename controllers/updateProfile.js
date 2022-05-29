const regUserSchema = require('../models/userModel')
const bcrypt = require('bcrypt');




const editProfile = async(req,res)=>{
    try {
        
        const newMobile = req.body.newMobile; 
        const newName = req.body.newName;
        const userData = await regUserSchema.findById({_id : req.session.user_id})
        if(newName !== userData.name){
            const updatedName =  await regUserSchema.updateOne({name:userData.name},{$set:{name:newName}})
            res.send("profile updated successfully")
        }else if(newMobile.length !== 10 && newMobile == userData.Mobile){
             const updatedMobile =  await regUserSchema.updateOne({mobile:userData.mobile},{$set:{mobile:newMobile}})
            
        }else{
            res.send("Enterd value is invalid or already exist , please enter a valid input ") 
        }
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    editProfile
}
