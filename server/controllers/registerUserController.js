const Users = require("../models/registerModel");


const registerUserController = async (req,res)=>{
 const {registeredData}  = req.body;
console.log(registeredData);
try{
    const user = await Users.create(registeredData);
    await user.save();
    res.status(200).json({msg:"Registration Successfull"});
}
catch(e){
    res.status(501).json({msg:"Internal Server Error"});
}


}


module.exports = registerUserController;