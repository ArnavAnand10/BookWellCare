const Doctor = require("../models/doctorModel");

const fetchDoctorsDataController = async (req, res) => {

   const category = req.query.category;
   const location = req.query.location;
   
try{

    const fetchedData = await Doctor.find({category:category, location:location});
    // const fetchedData = await Doctor.find({});
    if(fetchedData.length!=0){
        console.log(fetchedData);
     res.status(200).json({data:fetchedData})
    }else{
     res.status(200).json({msg:"No Doctor Available Right Now"})
    }

}catch(e){
    res.status(502).json({msg:"Internal Server Error"})
}
  

   ;

}

module.exports = fetchDoctorsDataController