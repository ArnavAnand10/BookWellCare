const appointment = require("../models/appointments");

const fetchBookedAppointmentsController = async (req, res) => {
    const { username } = req.query;
    // searching in appointment database
   

    try {

        const userAppointents = [];
        const allData = await appointment.find();

        allData.map((item) => {

            item.appointedSlot.map((slot) => {
                if (slot.usernames === username) {
                    const fees = item.fees
                    const date = item.date;
                    const doctorName = item.doctorName;
                    const doctorPhone = item.doctorPhone;
                    const data = {
                        ...slot, date, doctorName, doctorPhone,fees

                    }
                    userAppointents.push(data)
                }
            })

        })

        userAppointents.reverse()

        res.status(200).json({appointments:userAppointents})

    } catch (e) {

        res.status(501).json({msg:"Internal Server Error"})

    }



  


}


module.exports = fetchBookedAppointmentsController;