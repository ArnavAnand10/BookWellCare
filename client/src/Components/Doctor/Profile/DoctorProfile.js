import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Alert, Autocomplete, Avatar, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import axios from "axios"



export const DoctorProfile = () => {

    const [isEditProfile, setEditProfile] = useState(false);

    const UserProfile = () => {

        const navigate = useNavigate();
        const [snackBarVisibiliy, setSnackBarVisibility] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
        const [snackBarType, setSnackBarType] = useState("success");
        const [isLoading, setIsLoading] = useState(false);

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

        ]



        const defaultValues = {
            name: "name",
            email: "",
            password: "",
            age: "",
            location: "",

            education: "",
            experience: "",

            startTime: "",
            endTime: "",
            timingForPatient: "",
        }


        const [signupData, setLoginData] = useState(defaultValues);
        const [category, setCategory] = useState("none");
        const [location, setLocation] = useState("none");
        const [doctorDefaultData, setDoctorDefaultData] = useState({})




        function customSnackBar() {
            return (<Snackbar open={snackBarVisibiliy} autoHideDuration={6000} onClose={() => { setSnackBarVisibility(false) }}>
                <Alert onClose={() => { setSnackBarVisibility(false) }} severity={snackBarType} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>)
        }

        function onChange(e) {
            setLoginData({ ...signupData, [e.target.name]: e.target.value });
            console.log(signupData);

        }


        async function validateUser() {


            const name = "Dr. " + signupData.name;
            signupData.name = name;
            signupData.category = category;
            signupData.location = location;
            console.log(signupData);

            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;




            for (let key in signupData) {
                if (!signupData[key]) {
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

        // get doctor details

        useEffect(() => {



            if (!localStorage.getItem("email")) {
                navigate("/doctorLogin")
            }


            const fetchDoctorDetails = async () => {
                const mail = localStorage.getItem("email")

                try {
                    const response = await axios.get(`http://localhost:8080/fetchDoctorDetailsForProfile?email=${mail}`)
                    response.data.doctorData.name = response.data.doctorData.name.slice(4);
                    setDoctorDefaultData(response.data.doctorData);


                } catch (e) {
                    console.log(e);
                }


            }

            fetchDoctorDetails();

        }, [])

        return (
            <div className=" bg-white py-8 rounded-lg m-10  shadow-lg">
                {customSnackBar()}

                <h1 className="text-2xl md:text-4xl font-medium mb-8">Your Profile</h1>

                <div className="flex flex-col justify-start items-center gap-4">
                    <Avatar sx={{ width: 70, height: 70 }}> <h1 className="text-3xl">A</h1> </Avatar>

                    {doctorDefaultData.length == 0 ? <CircularProgress /> : <div>

                        <h1 className="mt-8 mb-2  text-2xl md:text-3xl font-semibold">Personal Details</h1>


                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"



                        }}

                            InputProps={{
                                readOnly: true,
                            }}

                            label="Name" InputLabelProps={{
                                shrink: true,
                            }} variant="outlined" onChange={(e) => {
                                onChange(e);
                            }} name="name" type="text" value={doctorDefaultData.length != 0 && doctorDefaultData.name} > </TextField>






                        {/* Age */}
                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}

                            InputProps={{
                                readOnly: true,
                            }}
                            value={doctorDefaultData.length != 0 && doctorDefaultData.age} onChange={(e) => {
                                onChange(e);
                            }} name="age" type="number" label="Age">

                        </TextField>

                        {/* Location */}

                        {/* <Autocomplete
                        id="location"
                        name="location"
                        onChange={(event, value) => { value != null && setLocation(value.label) }}
                        InputProps={{
                            readOnly: true,
                        }}

                        InputLabelProps={{
                            shrink: true,
                        }}




                        options={locations}
                        sx={{
                            marginTop: "20px !important",
                            width: "80%",
                            margin: "auto"
                        }}
                        renderInput={(params) => <TextField {...params} label="Location" />}
                    /> */}

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                            InputProps={{
                                readOnly: true,
                            }}

                            value={doctorDefaultData.location} name="location" type="text" label="Location">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}

                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={doctorDefaultData.hospitalAddress} name="hospitalAddress" type="text" label="Hospital Address">

                        </TextField>




                        <h1 className="mt-8 mb-2  text-2xl md:text-3xl font-semibold">Education/Experience Details</h1>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={doctorDefaultData.education} name="education" type="text" label="Education">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={doctorDefaultData.experience} name="experience" type="number" label="Experience (in Years)">

                        </TextField>

                        {/* 
                    <Autocomplete

                        id="category"
                        options={categories}
                        onChange={(event, value) => { value != null && setCategory(value.label) }}
                        sx={{
                            marginTop: "20px !important",
                            width: "80%",
                            margin: "auto"
                        }}


                        InputProps={{
                            readOnly: true,
                        }}

                     defaultValue={doctorDefaultData.category}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    /> */}

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                            InputProps={{
                                readOnly: true,
                            }}

                            value={doctorDefaultData.category} name="startTime" type="text" label="Category">

                        </TextField>

                        <h1 className="mt-8  mb-2   text-2xl md:text-3xl font-semibold">Timing Details</h1>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                            InputProps={{
                                readOnly: true,
                            }}

                            value={doctorDefaultData.startTime} name="startTime" type="time" label="Starting Time">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={doctorDefaultData.endTime} name="endTime" type="time" label="Ending Time">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}

                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={doctorDefaultData.length != 0 && doctorDefaultData.timingForPatient} name="timingForPatient" type="text" label="Timing Per Patient (in Minutes)">

                        </TextField>


                        <Button disableElevation sx={{
                            width: "80%",
                            marginTop: "20px",

                        }} variant="contained" onClick={()=>{setEditProfile(true)}} color="primary">{"Edit Profile"}</Button>

                    </div>
                    }
                </div>

            </div>
        )

    }


    const EditProfile = () => {

        const navigate = useNavigate();
        const [snackBarVisibiliy, setSnackBarVisibility] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
        const [snackBarType, setSnackBarType] = useState("success");
        const [isLoading, setIsLoading] = useState(false);

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

        ]



        const defaultValues = {
            name: "",
           
            age: "",
           
            hospitalAddress: "",
            education: "",
            experience: "",

            startTime: "",
            endTime: "",
            timingForPatient: "",
        }


        const [signupData, setLoginData] = useState(defaultValues);
    




        function customSnackBar() {
            return (<Snackbar open={snackBarVisibiliy} autoHideDuration={6000} onClose={() => { setSnackBarVisibility(false) }}>
                <Alert onClose={() => { setSnackBarVisibility(false) }} severity={snackBarType} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>)
        }

        function onChange(e) {
            setLoginData({ ...signupData, [e.target.name]: e.target.value });
            console.log(signupData);

        }


        async function updateDoctor() {

            var toSend = true;
           
           
            console.log(signupData);

            console.log(signupData);



          
            for (let key in signupData) {
                if (!signupData[key]) {
                    console.log(signupData[key]);
                   
                    setSnackBarMessage("All fields are required");
                    setSnackBarType("error")
                    setSnackBarVisibility(true);
                    toSend = false;
                }
            }
        




                if(toSend){
                const name = "Dr. " + signupData.name;
                signupData.name = name;
                console.log("called");
                const config = {
                    headers: {
                        "content-type": "application/json",
                    }
                }
                try {
                    const email = localStorage.getItem("email");
                    const data = {
                        signupData,
                        email ,
                    }
                  
                    setIsLoading(true);
                    const response = await axios.post("http://localhost:8080/updateDoctorDetails", {data}, config);
                   
                    setSnackBarMessage(response.data.msg);
                    setSnackBarType("success");
                    setSnackBarVisibility(true);
                    setEditProfile(false);         
                   

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
            <div className=" bg-white py-8 rounded-lg m-10  shadow-lg">
                {customSnackBar()}

                <h1 className="text-2xl md:text-4xl font-medium mb-8">Your Profile</h1>

                <div className="flex flex-col justify-start items-center gap-4">
                    <Avatar sx={{ width: 70, height: 70 }}> <h1 className="text-3xl">A</h1> </Avatar>

                    <div>

                        <h1 className="mt-8 mb-2  text-2xl md:text-3xl font-semibold">Personal Details</h1>


                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"



                        }}


                            label="Name" variant="outlined" onChange={(e) => {
                                onChange(e);
                            }} name="name" type="text"  > </TextField>






                        {/* Age */}
                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined"

                            onChange={(e) => {
                                onChange(e);
                            }} name="age" type="number" label="Age">

                        </TextField>

                        {/* Location */}

                       





                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}

                           
                            name="hospitalAddress" type="text" label="Hospital Address">

                        </TextField>




                        <h1 className="mt-8 mb-2  text-2xl md:text-3xl font-semibold">Education/Experience Details</h1>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                          
                            name="education" type="text" label="Education">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                           
                            name="experience" type="number" label="Experience (in Years)">

                        </TextField>


                       

                       

                        <h1 className="mt-8  mb-2   text-2xl md:text-3xl font-semibold">Timing Details</h1>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                           
                            name="startTime" type="time" label="Starting Time">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}
                            
                            name="endTime" type="time" label="Ending Time">

                        </TextField>

                        <TextField sx={{
                            marginTop: "20px",
                            width: "80%"
                        }} variant="outlined" onChange={(e) => {
                            onChange(e);
                        }}

                           
                            name="timingForPatient" type="text" label="Timing Per Patient (in Minutes)">

                        </TextField>

                        <div className="flex flex-row gap-3 justify-center items-center">
                            <Button disableElevation sx={{

                                marginTop: "20px",

                            }} variant="contained" onClick={()=>{setEditProfile(false)}} color="error">{"Cancel"}</Button>

                            <Button disableElevation sx={{

                                marginTop: "20px",

                            }} variant="contained" onClick={updateDoctor} color="primary">{"Update Profile"}</Button>


                        </div>


                    </div>

                </div>

            </div>
        )

    }


    return  isEditProfile ? <EditProfile /> : <UserProfile />

}



