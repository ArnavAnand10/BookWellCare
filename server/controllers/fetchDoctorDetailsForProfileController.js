const Doctor = require("../models/doctorModel");

const fetchDoctorDetailsForProfileController = async (req,res)=>{

    const {email} = req.query;
try{
    const doctorData = await Doctor.findOne({email}).select("-password");
    res.status(200).json({doctorData})
  
}catch(e){
    console.log(e);
    res.status(501).json({msg:"Internal Server Error"})
}
  
}

module.exports =  fetchDoctorDetailsForProfileController;