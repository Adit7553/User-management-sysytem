const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    mobile:{
        type: Number,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    },
    is_verified:{
        type:Number,
        default:0
    }
})

const regUserSchema = mongoose.model('RegisterdUser', userSchema)

module.exports = regUserSchema