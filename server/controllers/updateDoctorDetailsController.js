const Doctor = require("../models/doctorModel");

const updateDoctorDetailsController = async (req,res)=>{
    const {signupData,email} = req.body.data;
    console.log(signupData);

    try{
    const data = await Doctor.findOneAndUpdate({email:email},signupData,{new:true});
    res.status(200).json({msg:"Details Updated"})
}
    catch(e){
        console.log(`${e}`);
        res.status(501).json({msg:"Internal Server Error"})
    }
}

module.exports = updateDoctorDetailsController;