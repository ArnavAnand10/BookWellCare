const mongoose = require("mongoose");
const Users = require("../models/registerModel");
const bcrypt = require("bcrypt")






const verifyDataController = async (req, res) => {
   
    const  {username,email}  = req.body.data;
    console.log(username,email);
  
    try {
        const user = await Users.findOne({username});
        if (!user) {
         const newUser = await Users.findOne({email});
              if (!newUser) {
               res.status(200).json({ msg: "Data is Unique" });
            }
            else {
                res.status(501).json({ msg: "Email Already Taken" });
            }
        }
        else {
            res.status(501).json({ msg: "Username Already Taken" });
        }

    }
    catch (e) {
    console.log(e);
        res.status(501).json({ msg: "Internal Server Error" });
    }
}



module.exports = verifyDataController;