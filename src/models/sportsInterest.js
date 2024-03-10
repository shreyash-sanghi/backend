const mongoose = require("mongoose");
const validator = require('validator');


const Sport = new mongoose.Schema({
    longitude:{
        type:String,
       },
       latitude:{
        type:String,
       },
       image:{
        type:String
       },
    CoreSkill:{
     type:String,
     required:true,
    },
    DOB:{
        type:String,
        required:true,
    },
    Bio:{
        type:String,
        required:true
    },
    skillLevel:{
        type:String,
        required:true,
    },
    FName:{
        type:String,
        required:true,
    },
    selectedSports:[{
        type:String,
        required:true,
    }],
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

})



const register = new mongoose.model("UserSportData",Sport);
module.exports = register;