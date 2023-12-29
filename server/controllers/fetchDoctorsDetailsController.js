const Doctor = require("../models/doctorModel")

const fetchDoctorsDetailsController = async (req,res)=>{

    req.query.phoneNumber = "+"+ req.query.phoneNumber;
    req.query.phoneNumber = req.query.phoneNumber.slice(0,1) + req.query.phoneNumber.slice(2)
    console.log( req.query.phoneNumber);

    try{
        const doctorDetail = await Doctor.findOne({name:req.query.name, phoneNumber:req.query.phoneNumber})
        console.log(doctorDetail);
        res.status(200).json({details:doctorDetail})

    }catch(e){
        res.status(501).json({msg:"Internal Server Error"})
    }



}

module.exports = fetchDoctorsDetailsController

