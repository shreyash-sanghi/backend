const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require('validator');


const Register = new mongoose.Schema({
    FName:{
        type:String,
        required:true
    },
    LName:{
        type:String,
        required:true
    },
    Number:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("Email is invalid")
            }
           }
    },
    Password:{
        type:String,
        required:true
    }
})

//bscript password
Register.pre("save",async function(next){
    if(this.isModified("Password")){
    this.Password = await bcrypt.hash(this.Password,10);
    }
    next();
})

const register = new mongoose.model("RegisterData",Register);
module.exports = register;