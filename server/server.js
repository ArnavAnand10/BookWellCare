const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require("cors")
const { connection } = require("./database/database");
const router = require("./routes/routes");
const dummyData = require("./constants/doctors");
const Doctor = require("./models/doctorModel");


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(hour) {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(hour, minute) {
    const paddedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const paddedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    return `${paddedHour}:${paddedMinute}`;
}

const dummyDataWithTimings = dummyData.map(doctor => {
    const timePerPatient = getRandomInt(10, 20); // Random time between 10 and 20 minutes
    const startTimeRange = [8, 16]; // Start time range between 8 AM and 4 PM

    const startTime = getRandomInt(startTimeRange[0], startTimeRange[1]);
    const maxEndTime = startTime + timePerPatient * 3; // Ensuring end time allows for at least 3 patients
    const endTime = getRandomInt(startTime + 1, Math.min(maxEndTime, 24)); // Ensure endTime is within the 24-hour clock

    return {
        ...doctor,
        startTime: formatTime(startTime, 0), // Start time in HH:mm format
        endTime: formatTime(endTime, 0), // End time in HH:mm format
        timePerPatient,
    };
});



connection();

async function insertion(){  
    try{
    await Doctor.insertMany(dummyDataWithTimings);
    console.log("Doctor chle gye");
    }
    catch(e){
        console.log("nh gye yrrr",e);
    }

}
// insertion();





const PORT = process.env.PORT;

console.log("\n")

app.use(express.json())
app.use(cors())
app.use("/files", express.static("files"))
app.use("/",router)

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})
