const express = require("express");
const router = express();
const Register = require("../models/register");
const SportData = require("../models/sportsInterest");
const userauth = require("../middleware/userauth");

router.get("/sport_data/:id",userauth,async(req,res)=>{
    try {
        const id = req.params.id;
     const userdata = await Register.findOne({_id:id});
     const Email = userdata.Email;
     const Name = userdata.FName;
     const user_sport_data = await SportData.findOne({Email});
     const sport_data = await SportData.find({},["-Email","-Bio","-DOB"]);
     res.status(202).json({Name,user_sport_data,sport_data});
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
})
router.get("/sport_user_data/:id",async(req,res)=>{
    try {
        const id = req.params.id;
     const userdata = await Register.findOne({_id:id});
     const Email = userdata.Email;
     const Number = userdata.Number;
     const user_sport_data = await SportData.findOne({Email});
     res.status(202).json({Number,user_sport_data});
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
})

router.post("/sportsDetailForm/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const {CoreSkill,DOB,Bio,Email,skillLevel,firlocation,image,FName} = req.body;
        if(firlocation === undefined ){
            const result = await SportData.create({
                CoreSkill,DOB,Bio,Email,skillLevel,FName,selectedSports:req.body.selectedSports,image,longitude:"",latitude:""
                })
        }
        else{
            const {longitude,latitude} = firlocation;
            const result = await SportData.create({
                CoreSkill,DOB,Bio,Email,skillLevel,FName,selectedSports:req.body.selectedSports,image,longitude,latitude
                })
        }
     res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
})

module.exports = router;