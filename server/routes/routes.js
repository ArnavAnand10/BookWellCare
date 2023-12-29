const express = require('express');
const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.RAZOR_PAY_API_KEY;
const apiSecret = process.env.RAZOR_PAY_API_SECRET


const fetchDoctorsDataController = require('../controllers/fetchDoctorsDataController');
const fetchDoctorsDetailsController = require('../controllers/fetchDoctorsDetailsController');
const bookAppointmentController = require('../controllers/bookAppointmentController');
const loginUserController = require('../controllers/loginUserController');
const fetchBookedAppointmentsController = require('../controllers/fetchBookedAppointmentsController');
const verifyDataController = require('../controllers/verifyDataController');
const registerUserController = require('../controllers/registerUserController');
const registerDoctorController = require('../controllers/registerDoctorController');
const registerDoctorFinalController = require('../controllers/registerDoctorFinalController');
const doctorLoginController = require('../controllers/doctorLoginController');
const { getTodayAppointments } = require('../controllers/getTodayAppointments');
const fetchDoctorDetailsForProfileController = require('../controllers/fetchDoctorDetailsForProfileController');
const updateDoctorDetailsController = require('../controllers/updateDoctorDetailsController');
const { uploadFileController } = require('../controllers/uploadFileController');
const fetchReportsController = require('../controllers/fetchReportsController');
const deleteFileController = require('../controllers/deleteFileController');
const { generatePaymentController } = require('../controllers/generatePaymentController');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.get("/fetchDoctorsData", fetchDoctorsDataController)
router.get("/fetchDoctorDetails", fetchDoctorsDetailsController)
router.get("/getTodayAppointments", getTodayAppointments)
router.get("/fetchDoctorDetailsForProfile", fetchDoctorDetailsForProfileController)
router.get("/fetchReports", fetchReportsController)
router.post("/deleteFile", deleteFileController)

router.post("/uploadFiles", upload.single("file"), uploadFileController)
router.post("/updateDoctorDetails", updateDoctorDetailsController)
router.post("/bookAppointment", bookAppointmentController)
router.post("/verifyData", verifyDataController)
router.post("/login", loginUserController)
router.get("/bookedAppointments", fetchBookedAppointmentsController);
router.post("/registerUser", registerUserController)
router.post("/registerDoctor", registerDoctorController)
router.post("/registerDoctorFinal", registerDoctorFinalController)
router.post("/doctorLogin", doctorLoginController)
router.post("/generatePayment", generatePaymentController);

router.get("/getKey", (req, res) => {
    res.status(200).json({ key: apiKey })
})


module.exports = router