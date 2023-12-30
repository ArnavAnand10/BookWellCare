
const { DateTime, Duration } = require('luxon');


const registerDoctorFinalController = async (req, res) => {



    const Doctor = require("../models/doctorModel");

   

   
    const { registeredData } = req.body;
    console.log(registeredData);


     // Example usage:
     const startTime = registeredData.startTime;
     const endTime = registeredData.endTime;
     const timingForPatient =  registeredData.timingForPatient;
 
     const timingSlots = calculateTimingSlots(startTime, endTime, timingForPatient);

     registeredData.availableSlots = timingSlots;
 
    try {
        const user = await Doctor.create(registeredData);
        await user.save();
        console.log("doctor saved");
        res.status(200).json({ msg: "Registration Successfull" });
    }
    catch (e) {
        res.status(501).json({ msg: "Internal Server Error" });
    }






}


function calculateTimingSlots(startTime, endTime, timingForPatient) {
    const start = DateTime.fromFormat(startTime, 'HH:mm');
    let end = DateTime.fromFormat(endTime, 'HH:mm');
    const timingForPatientInt = parseInt(timingForPatient, 10);
    const slotDuration = Duration.fromObject({ minutes: timingForPatientInt });
  
    const slots = [];
  
    let currentTime = start;
  
    while (currentTime < end) {
      let endTimeSlot = currentTime.plus(slotDuration);
  
      // Ensure the calculated end time does not exceed the specified end time
      if (endTimeSlot > end) {
        break;
      }
  
      slots.push({
        start: currentTime.toFormat('hh:mm a'),
        end: endTimeSlot.toFormat('hh:mm a'),
      });
      currentTime = endTimeSlot;
    }
  
    return slots;
  }


module.exports = registerDoctorFinalController;