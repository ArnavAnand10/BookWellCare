const Doctor = require("../models/doctorModel");

const registerDoctorController = async (req,res)=>{

    const signupData   = req.body.data;
    console.log(signupData);

    const user = await Doctor.findOne({email: signupData.email});
    if(!user){
        res.status(200).json({msg:"Can Be Registered"});
    }
    else{

        res.stauts(501).json({msg:"Doctor With This Mail Already Exists"})

    }


}


module.exports = registerDoctorController;