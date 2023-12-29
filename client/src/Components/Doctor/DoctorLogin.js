import { Alert, Autocomplete, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SpaIcon from '@mui/icons-material/Spa';
import { motion } from "framer-motion";
import axios from "axios";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "../../firebase/firebase"
import { MuiTelInput } from 'mui-tel-input'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import OTPInput from "otp-input-react";




export const DoctorLogin = () => {

    const navigate = useNavigate();


    const [showLogin, setShowLogin] = useState(true);


   




    function Login() {
        const defaultValues = {
            email: "",
            password: "",
        }
        const [loginData, setLoginData] = useState(defaultValues);
        const [isLoading, setIsLoading] = useState(false);

        const [snackBarVisibiliy, setSnackBarVisibility] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
        const [snackBarType, setSnackBarType] = useState("success");


        function customSnackBar() {
            return (<Snackbar open={snackBarVisibiliy} autoHideDuration={6000} onClose={() => { setSnackBarVisibility(false) }}>
                <Alert onClose={() => { setSnackBarVisibility(false) }} severity={snackBarType} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>)
        }

        function onChange(e) {
            setLoginData({ ...loginData, [e.target.name]: e.target.value });
        }

        async function loginValidate() {

          
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


            if ((!loginData.email) || !(loginData.password)) {

                setSnackBarMessage("All fields are required");
                setSnackBarType("error")
                setSnackBarVisibility(true)
            }

            else if (!loginData.email.match(emailRegex)) {

                setSnackBarMessage("Enter Valid Email");
                setSnackBarType("error")
                setSnackBarVisibility(true)
            } else {


                try {
                    const config = {
                        headers: {
                            "content-type": "application/json"
                        }
                    }

                    const response = await axios.post("http://localhost:8080/doctorLogin", { data: loginData }, config);
                  
                    localStorage.setItem("email", response.data.email);

                    navigate("/admin/appointments");
                }

                catch (e) {
                    setSnackBarMessage(e.response.data.msg);
                    setSnackBarType("error")
                    setSnackBarVisibility(true)
                    console.log("error", e.response.data.msg);
                }

            }

        }


        return <div className=" bg-[#B7DDFB]   min-h-screen  flex flex-col justify-center items-center " >

            {customSnackBar()}

            <div className="w-full sm:w-1/2 flex bg-white flex-col justify-center py-14 items-center rounded-lg auth-container">
                <SpaIcon sx={{ fontSize: 60, marginBottom: "20px", color: "#1976D2" }} />
                <h1 className=" font-bold text-xl md:text-3xl mb-2" > Doctor Login</h1>
                <h1 className=" font-normal text-sm md:text-md  " >Dont't have an account yet? <span style={{
                    cursor: "pointer",
                }} onClick={() => setShowLogin(false)} className="text-blue-500 font-semibold">  Signup</span> </h1>
                <TextField sx={{
                    marginTop: "20px",
                    width: "80%",


                }} variant="outlined" onChange={(e) => {
                    onChange(e);
                }} name="email" type="email" label="Email"></TextField>
                <TextField sx={{
                    marginTop: "20px",
                    width: "80%"
                }} variant="outlined" onChange={(e) => {
                    onChange(e);
                }} name="password" type="password" label="Password"></TextField>


                <Button disableElevation sx={{
                    width: "80%",
                    marginTop: "20px",

                }} variant="contained" onClick={loginValidate} color="primary"  >{isLoading ? <CircularProgress color="inherit" /> : "Login"}   </Button>
            </div>
        </div>
    }

    const Signup = () => {
        const steps = [
            'Add Your Details',
            'Verify Phone Number',
            'Register Successfull',
        ];

        const [snackBarVisibiliy, setSnackBarVisibility] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
        const [snackBarType, setSnackBarType] = useState("success");
        const [isLoading, setIsLoading] = useState(false);
        const [activeStep, setActiveStep] = useState(0);
        const [showOtpBox, setShowOtpBox] = useState(false);

        const [registerData, setRegisterData] = useState({});

        function customSnackBar() {
            return (<Snackbar open={snackBarVisibiliy} autoHideDuration={6000} onClose={() => { setSnackBarVisibility(false) }}>
                <Alert onClose={() => { setSnackBarVisibility(false) }} severity={snackBarType} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>)
        }






        // form
        const FormComponent = () => {


            const locations = [
                { label: 'Pune' },
                { label: 'Mumbai' },
                { label: 'Jammu' },
                { label: 'Delhi' },
                { label: 'Hyderabad' },
                { label: 'Bangalore' },
                { label: 'Rajasthan' },
                { label: 'Kashmir' },
                { label: 'Leh' },
            
            
            
            
            ];
            
            const categories = [
                { label: 'Physicians' },
                { label: 'Surgeons' },
                { label: 'Dentists' },
                { label: 'Pediatricians' },
                { label: 'Cardiologists' },
                { label: 'Orthopedic Surgeons' },
                { label: 'Gynecologists' },
                { label: 'Ophthalmologists' },
                { label: 'Dermatologists' },
                { label: 'Neurologists' },
                { label: 'Psychiatrists' },
                { label: 'Oncologists' },
                { label: 'Radiologists' },
                { label: 'Urologists' },
                { label: 'Endocrinologists' },
                { label: 'Gastroenterologists' },
                // Add more categories as needed
            ]
            
         


            










            const defaultValues = {
                name: "",
                email: "",
                password: "",
                age: "",
                location:"",
               
                education:"",
                experience:"",
              
                startTime:"",
                endTime:"",
                timingForPatient:"",

                fees :"",
            }
            const [signupData, setLoginData] = useState(defaultValues);
            const [category, setCategory] = useState("none");
            const [location, setLocation] = useState("none");

            function onChange(e) {
                setLoginData({ ...signupData, [e.target.name]: e.target.value });

            }


            async function validateUser() {
                const name = "Dr. "+ signupData.name;
                signupData.name = name;
                signupData.category = category;
                signupData.location = location;
                console.log(signupData);

                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


               

                    for(let key in signupData){
                        if(!signupData[key]){
                            setSnackBarMessage("All fields are required");
                            setSnackBarType("error")
                            setSnackBarVisibility(true)
                        }
                       }
                
                
               
             

                if (!signupData.email.match(emailRegex)) {

                    setSnackBarMessage("Enter Valid Email");
                    setSnackBarType("error")
                    setSnackBarVisibility(true)
                }

                else if (!signupData.password.match(passRegex)) {
                    setSnackBarMessage("Weak Password : Minimum eight characters, at least one letter, one number and one special character is Required");
                    setSnackBarType("error")
                    setSnackBarVisibility(true)

                }
                else {
                    console.log("called");
                    const config = {
                        headers: {
                            "content-type": "application/json",
                        }
                    }
                    try {
                        setIsLoading(true);
                        const response = await axios.post("http://localhost:8080/registerDoctor", { data: signupData }, config);
                        setRegisterData(signupData);
                        console.log(response.data.msg);
                        setShowOtpBox(true)
                        setActiveStep(1);

                    }
                    catch (e) {
                        setIsLoading(false);
                        setSnackBarMessage(e.response.data.msg);
                        setSnackBarType("error");
                        setSnackBarVisibility(true);

                    }
                }

            }


            return (

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}>

                    <div>

                        <h1 className="mt-8 mb-2  text-2xl md:text-3xl font-semibold">Personal Details</h1>


                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"



                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="name" type="text" label="name"></TextField>


                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"



                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="email" type="email" label="Email"></TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="password" type="password" label="Password"></TextField>


                        {/* Age */}
                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="age" type="number" label="Age">

                        </TextField>

                    {/* Location */}

                    <Autocomplete
                        id="location"
                        name="location"
                        onChange={(event, value) => { value != null && setLocation(value.label) }}


                        options={locations}
                        sx={{
                            marginTop: "20px !important",
                            width: "80%",
                            margin:"auto"
                        }} 
                        renderInput={(params) => <TextField {...params} label="Location" />}
                    />

                    <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="hospitalAddress" type="text" label="Hospital Address">

                        </TextField>
                   

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="fees" type="numbrt" label="Consultation Fees (in Rs)">

                        </TextField>

                   

                        <h1 className="mt-8 mb-2  text-2xl md:text-3xl font-semibold">Education/Experience Details</h1>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="education" type="text" label="Education">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="experience" type="number" label="Experience (in Years)">

                        </TextField>

                       
                    <Autocomplete

                        id="category"
                        options={categories}
                        onChange={(event, value) => { value != null && setCategory(value.label) }}
                        sx={{
                            marginTop: "20px !important",
                            width: "80%",
                            margin:"auto"
                        }} 
                      
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />

                        <h1 className="mt-8  mb-2   text-2xl md:text-3xl font-semibold">Timing Details</h1>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="startTime" type="time" label="Starting Time">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="endTime" type="time" label="Ending Time">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }} name="timingForPatient" type="text" label="Timing Per Patient (in Minutes)">

                        </TextField>


                        <Button disableElevation sx={{
                            width: "80%",
                            marginTop: "20px",

                        }} variant="contained" onClick={validateUser} color="primary">{isLoading ? <CircularProgress color="inherit" /> : "Create Account"}</Button>

                    </div>
                </motion.div>


            )
        }

        // OTP container
        const OtpBox = ({ data }) => {





            const [otpsnackBarVisibiliy, setotpSnackBarVisibility] = React.useState(false);
            const [otpsnackBarMessage, setotpSnackBarMessage] = React.useState("Test Message");
            const [otpsnackBarType, setotpSnackBarType] = React.useState("success");

            function customotpSnackBar() {
                return (<Snackbar open={otpsnackBarVisibiliy} autoHideDuration={6000} onClose={() => { setotpSnackBarVisibility(false) }}>
                    <Alert onClose={() => { setotpSnackBarVisibility(false) }} severity={otpsnackBarType} sx={{ width: '100%' }}>
                        {otpsnackBarMessage}
                    </Alert>
                </Snackbar>)
            }


            const [isLoading, setLoading] = useState(false);
            const [isOtpLoading, setOtpLoading] = useState(false);


            const [OTP, setOTP] = useState("");

            const [phone, setPhone] = React.useState('')

            const handlePhoneChange = (newValue) => {
                setPhone(newValue);
            }

            function handleChange(e) {
                setOTP(e);

            }


            function onCaptchaVerify() {

                const recaptchaContainer = document.getElementById('recaptcha-container');

                recaptchaContainer.replaceChildren();

                if (phone.length < 10) {

                    setotpSnackBarMessage("Enter Valid Phone Number");
                    setotpSnackBarType("error");
                    setotpSnackBarVisibility(true);

                } else {


                    setLoading(true)

                    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {

                        'size': 'normal',  // Use 'normal' size for a visible reCAPTCHA
                        'callback': (response) => {
                            // Callback function when reCAPTCHA is successfully solved
                            onSignUp();
                            setLoading(false)
                            // recaptchaContainer.replaceChildren();

                        },
                        'expired-callback': () => {
                            // Callback function when reCAPTCHA expires
                            console.log("Captcha verification expired");
                            setLoading(false)
                        }
                    });

                    // Render the reCAPTCHA explicitly
                    window.recaptchaVerifier.render();
                }
            }

            async function onSignUp() {

                setLoading(true);
                const appVerifier = window.recaptchaVerifier;

                try {

                    const recaptchaContainer = document.getElementById('recaptcha-container');
                    const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
                    window.confirmationResult = confirmationResult;

                    setLoading(false);
                    setotpSnackBarMessage("OTP Sent Successfully");
                    setotpSnackBarType("success");
                    setotpSnackBarVisibility(true);


                    recaptchaContainer.replaceChildren();
                   




                } catch (error) {
                    const recaptchaContainer = document.getElementById('recaptcha-container');

                    console.log("Error sending verification code:", error);
                    setotpSnackBarMessage("Cannot Send OTP, Try Again Later");
                    setotpSnackBarType("error");
                    setotpSnackBarVisibility(true);
                    setLoading(false);


                    recaptchaContainer.replaceChildren();

                }
            }


            async function otpVerify() {

                setOtpLoading(true);

                try {
                    await window.confirmationResult.confirm(OTP);
                    console.log("OTP Verification Successfull");

                    setotpSnackBarMessage("OTP Verification Successfull");
                    setotpSnackBarType("success");
                    setotpSnackBarVisibility(true);
                    // making post request for registering;
                    const config = {
                        headers: {
                            "content-type": "application/json"
                        }
                    }
                    const registerData = { ...data, phoneNumber: phone };

                    const response = await axios.post("http://localhost:8080/registerDoctorFinal", { registeredData: registerData }, config);

                    setOtpLoading(false);
                    setShowLogin(true);
                    setSnackBarMessage("Registration Successfull");
                    setSnackBarType("success");
                    setSnackBarVisibility(true);
                    window.location.reload();


                }
                catch (error) {

                    setotpSnackBarMessage("Invalid OTP")
                    setotpSnackBarType("error");
                    setotpSnackBarVisibility(true);
                    setOtpLoading(false);
                    console.log(`${error}`);

                }



            }



            return (<motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}>
                <div className="mt-10 text-center flex flex-col justify-center"  >



                    {customotpSnackBar()}


                    <MuiTelInput sx={{
                        width: "100%",
                        marginTop: "20px",
                        marginBottom: "20px",
                    }} placeholder="Phone Number" value={phone} onChange={handlePhoneChange} />

                    <div style={{ textAlign: "center" }} className="my-4" id="recaptcha-container"></div>

                    <Button onClick={() => { onCaptchaVerify() }} sx={{ marginBottom: "40px" }} variant="contained">{isLoading ? <CircularProgress color="inherit" /> : "Send OTP Via SMS"} </Button>

                    <h1 className="mb-4 text-2xl font-medium ">Enter OTP</h1>
                    <div className=" rounded-lg py-8 px-10 mb-8 otp-box">
                        <OTPInput autoFocus value={OTP} onChange={(e) => {
                            handleChange(e)
                        }} OTPLength={6} otpType="number" disabled={false} />


                    </div>
                    <Button variant="contained" size="medium" disableElevation onClick={otpVerify}>{isOtpLoading ? <CircularProgress color="inherit" /> : "Verify Otp"}</Button>

                </div>
            </motion.div>)
        }




        return <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>

            <div className=" bg-[#B7DDFB]  min-h-screen  flex flex-col justify-center items-center " >
                {customSnackBar()}

                <div className="w-full  md:my-10 sm:w-1/2 flex bg-white !flex-col justify-center py-10 items-center rounded-lg auth-container">



                    <SpaIcon sx={{ fontSize: 60, marginBottom: "20px", color: "#1976D2" }} />
                    <h1 className="font-bold text-xl md:text-3xl mb-2" >Register as a Doctor</h1>
                    <h1 className=" font-normal text-sm md:text-md  " >Already a Doctor on BookWellCare? <span style={{
                        cursor: "pointer",
                    }} onClick={() => setShowLogin(true)} className="text-blue-500 font-semibold">  Login </span> </h1>

                    <Box sx={{ width: '80%', marginTop: "20px" }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>


                    {showOtpBox ? <OtpBox data={registerData} /> : <FormComponent />}


                </div>


            </div>
        </motion.div>

    }

    return (showLogin ? <motion.div initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}> <Login /></motion.div> : <Signup />)
}
