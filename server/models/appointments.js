const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    date:{
        type:String
    },

  
    doctorName:{
        type:String
    },
    
    doctorPhone:{
        type:String
    },
    appointedSlot:{
        type:[]
    },
    availableSlots: {
        type: Number,
    },
    email:{
        type:String

    },
    fees:{
        type:String
    }
    

})

const appointment = new mongoose.model("appointment",appointmentSchema);

module.exports = appointment;