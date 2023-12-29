const registerDoctorFinalController = async (req,res) => {
    const Doctor = require("../models/doctorModel");

        const { registeredData } = req.body;
        console.log(registeredData);
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

module.exports = registerDoctorFinalController;