const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require("cors")
const { connection } = require("./database/database");
const router = require("./routes/routes");
const dummyData = require("./constants/doctors");
const Doctor = require("./models/doctorModel");
const combinedData = require("./constants/doctors");
const { DateTime, Duration } = require('luxon');


// 

connection();

async function insertion(){  
    try{
    await Doctor.insertMany(combinedData);
    console.log("Added Data Successfully");
    }
    catch(e){
        console.log(e);
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


