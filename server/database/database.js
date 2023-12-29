const mongoose  = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("BookWellCare DB connected");

    }catch(e){
        console.log("Error while connection DB", e);
    }
  
}

module.exports = {connection};