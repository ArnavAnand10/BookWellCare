const Doctor = require("../models/doctorModel");

const doctorLoginController = async (req,res)=>{
    const loginData = req.body.data
    const findUser = await Doctor.findOne({email:loginData.email});

    if(findUser){
        if(findUser.password===loginData.password){
            res.status(200).json({msg:"Login Successfull",email:loginData.email});
        }
        else{
            res.status(501).json({msg:"Enter Correct Password"});
        }
    }
    else{
        res.status(501).json({msg:"Doctor with this email doesnot Exists"});
    }

}


module.exports =  doctorLoginController;