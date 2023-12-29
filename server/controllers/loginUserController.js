
const Users = require("../models/registerModel");
const bcrypt = require("bcrypt")


const loginUserController = async (req,res)=>{
    const {email,password} = req.body.data;

    try{
    const user = await Users.findOne({email});
    if(!user){
        res.status(501).json({msg:"User with this mail doesn't exists."})
    }
    else{
        const dbPassword = user.password;
        try {
            // Assuming 'bcrypt' is imported or available in your environment
        
            // Compare the provided password with the stored hashed password
          
        
            // If the passwords match, send a success response
            if (password==dbPassword) {
                res.status(200).json({ msg: "Login Successful" , username: user.username});
            } else {
                // If the passwords don't match, send an error response
                res.status(502).json({ msg: "Enter Correct Password" });
            }
        } catch (error) {
            // Handle any potential errors that may occur during the comparison process
            console.error("Error during password comparison:", error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
        
      


    }
}
catch(e){
    res.status(503).json({msg: e});
    console.log(e);
}



    
}

module.exports = loginUserController;