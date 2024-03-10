const jwt = require("jsonwebtoken");
const Register = require("../models/register");



const pro = async (req,res,next)=>{
    try {
        const token = req.header('Authorization');
        const varifyUser = jwt.verify(token,process.env.Sectet_Key1);
        const user = await Register.findOne({_id:varifyUser._id})
        req.id = user._id;
        next();
    } catch (error) {
        res.status(401).send("error"+error);
    }
}
module.exports = pro;