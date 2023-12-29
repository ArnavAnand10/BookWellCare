const appointment = require("../models/appointments");

const getTodayAppointments =async (req,res)=>{


    const {date,email} = req.query;
    console.log(date,email)
       
        try{
    const bookedAppointments = await appointment.findOne({date, email});
    console.log(bookedAppointments);
    res.status(200).json({msg:bookedAppointments});
    }
    catch(e){
        res.status(501).json({msg:"Internal Server Error"});
    }




}


module.exports = {getTodayAppointments}