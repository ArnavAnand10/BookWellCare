
const mongoose = require("mongoose");
const appointment = require("../models/appointments")
const apiSecret = process.env.RAZOR_PAY_API_SECRET
const crypto = require('crypto');
const Doctor = require("../models/doctorModel");


const bookAppointmentController = async (req, res) => {
   const { data, razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;



   const sha = crypto.createHmac("sha256", apiSecret)
   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
   const digest = sha.digest("hex");


   console.log(data);
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


   if (digest == razorpay_signature) {
      try {
         const fetchedData = await appointment.findOne({ date: data.date, doctorName: data.doctor });
         const fetchedDoctor = await Doctor.findOne({name:data.doctor,phoneNumber:data.docPhone})

         const slots = fetchedDoctor.availableSlots;
        
         const totalNumberOfSlots = slots.length;

         if (!fetchedData) {
            const appointmentData = {
               email: data.email,
               date: data.date,
               doctorName: data.doctor,
               doctorPhone: data.docPhone,
               appointedSlot: [{
                  patientName: data.name,
                  usernames: data.username,
                  patientPhone: data.phone,
                  age: data.age,
                  gender: data.gender,
                  slot: 1,
                  startTime :  slots[0].start,
                  endTime :  slots[0].end,
               }],
               availableSlots: totalNumberOfSlots - 1,
               fees:data.fees
             


            }

            console.log(appointmentData);

            const saveData = await appointment.create(appointmentData);
            await saveData.save();
            res.status(200).json({ msg: `Appointment Booked For Date ${data.date}` })
            console.log("appointment Booked");
         }
         else {

            const fetchData = await appointment.findOne({ date: data.date, doctorName: data.doctor });
            const fetchedDoctor = await Doctor.findOne({name:data.doctor,phoneNumber:data.docPhone})

            const slots = fetchedDoctor.availableSlots;
            const totalNumberOfSlots = slots.length;
           
            if (fetchData.availableSlots == 0) {
               res.status(501).json({ msg: `No Slots Available for Date: ${data.date}` })
            } else {
               const updateData = await appointment.updateOne({ date: data.date, doctorName: data.doctor }, {
                  $set: {
                     availableSlots: fetchData.availableSlots - 1,
                  }
               });

               fetchData.appointedSlot.push({

                  patientName: data.name,
                  usernames: data.username,
                  patientPhone: data.phone,
                  age: data.age,
                  gender: data.gender,
                  slot: 5 - (fetchData.availableSlots - 1),
                  startTime :  slots[5 - (fetchData.availableSlots - 1)-2].start,
                  endTime :  slots[5 - (fetchData.availableSlots - 1)-2].end,

               })


               await fetchData.save();
               res.status(200).json({ msg: `Appointment Booked For Date ${data.date}` })
               console.log("appointment pushed");
            }


         }

      }
      catch (e) {
         res.status(501).json({ msg: `Internal Server Error` })

         console.log(e, "error in saving");
      }
   }
   else {
      res.status(501).json({ msg: "Transaction is not legit" })

   }


}


module.exports = bookAppointmentController;