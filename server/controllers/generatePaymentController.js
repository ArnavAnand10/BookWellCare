const dotenv = require('dotenv');
dotenv.config();
const Razorpay = require("razorpay");
const appointment = require('../models/appointments');

const generatePaymentController = async (req, res) => {



    const { data } = req.body;
    console.log(data);


    const instance = new Razorpay({
        key_id: process.env.RAZOR_PAY_API_KEY,
        key_secret: process.env.RAZOR_PAY_API_SECRET,
    });
    const options = {
        amount: Number(data.fees) * 100,
        currency: "INR"
    }


    const DateValue = new Date();
    if (data.date == "Today") {
        let day = DateValue.getDate();
        let month = DateValue.getMonth() + 1;
        let year = DateValue.getFullYear();
        data.date = `${day}-${month}-${year}`
    }
    else {
        let day = DateValue.getDate() + 1;
        let month = DateValue.getMonth() + 1;
        let year = DateValue.getFullYear();
        data.date = `${day}-${month}-${year}`
    }

    try {
        const fetchedData = await appointment.findOne({ date: data.date, doctorName: data.doctor });

        if (!fetchedData) {

            const order = await instance.orders.create(options);
            console.log(order);
            res.status(200).json({ order: order, key: process.env.RAZOR_PAY_API_KEY });


            

        }
        else {

            const fetchData = await appointment.findOne({ date: data.date, doctorName: data.doctor });
            if (fetchData.availableSlots == 0) {
                res.status(501).json({ msg: `No Slots Available for Date: ${data.date}` })
            } else {
                const order = await instance.orders.create(options);
                console.log(order);
                res.status(200).json({ order: order, key: process.env.RAZOR_PAY_API_KEY });
            }


        }

    }
    catch (e) {
        res.status(501).json({ msg: `Internal Server Error` })

        console.log(e, "error in saving");
    }


}



module.exports = { generatePaymentController }