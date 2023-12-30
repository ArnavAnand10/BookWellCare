const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: String,
    hospitalAddress:String,
   category:String,
   location: String,
    education:String,
    experience:String,
    phoneNumber: String,
  fees:String,
    startTime:String,
    endTime:String,
    timingForPatient: Number,
    availableSlots :[],
})

const Doctor = new mongoose.model("doctor", doctorSchema);

module.exports = Doctor;