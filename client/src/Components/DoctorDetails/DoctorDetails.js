import { useLocation } from "react-router-dom";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Avatar, Button, CircularProgress, Snackbar, useThemeProps } from "@mui/material";
import CallMadeIcon from '@mui/icons-material/CallMade';
import Header from "../Header/Header";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const DoctorDetailsPage = () => {
    const username = localStorage.getItem("username");

    const navigate = useNavigate();
    React.useEffect(() => {

        if (!localStorage.getItem("username")) {
            navigate("/login");
        }

    }, [])



    const { state } = useLocation();

    const defaultValues = {
        name: "",
        phone: "",
        age: "",
        gender: "",
        date: ""

    }

    const [patient, setPatientData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState("",)

    const [snackBarVisibiliy, setSnackBarVisibility] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("Test Message");
    const [snackBarType, setSnackBarType] = React.useState("success");

    function customSnackBar() {
        return (<Snackbar open={snackBarVisibiliy} autoHideDuration={6000} onClose={() => { setSnackBarVisibility(false) }}>
            <Alert onClose={() => { setSnackBarVisibility(false) }} severity={snackBarType} sx={{ width: '100%' }}>
                {snackBarMessage}
            </Alert>
        </Snackbar>)
    }

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };


    function handleChange(e) {
        setPatientData({ ...patient, [e.target.name]: e.target.value })
    }


    async function bookAppointment() {
        const phoneRegex = /^[789]\d{9}$/
        patient.gender = selectedValue;
        patient.date = selectedDate;
        patient.username = username;
        const patientData = { ...patient, doctor: data.name, docPhone: data.phoneNumber , email:data.email, fees:data.fees}
        console.log(patientData);

        if(!patient.name || !patient.phone || !patient.age || !patient.gender || !patient.date){
            setSnackBarMessage("All fields are required!");
            setSnackBarType("error");
            setSnackBarVisibility(true);
        }

            else if(!patient.phone.match(phoneRegex)){
                setSnackBarMessage("Enter Valid Phone Number");
                setSnackBarType("error");
                setSnackBarVisibility(true);
            }


    else{


        // making post request to server
        try {

            setIsLoading(true);
            const config = {
                headers: {
                    "content-type": "application/json"
                }
            }

            // creating order object instance

          const order = patientData;
        


        const { data: { key } } = await axios.get("http://localhost:8080/getKey");

        const {data} = await axios.post("http://localhost:8080/generatePayment", {data:order}, config);
        setIsLoading(false);

        const orderInstance = data.order;



        var options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "amount": orderInstance.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Arnav Ridham DEV",
            "description": "Flipkart Clone Test Transaction",

            "order_id": orderInstance.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {

                const config = {
                    headers: {
                        "content-type": "application/json"
                    }
                }
                const razorpay_payment_id = (response.razorpay_payment_id);
                const razorpay_order_id = (response.razorpay_order_id);
                const razorpay_signature = (response.razorpay_signature)

                try {
                    const response = await axios.post("http://localhost:8080/bookAppointment", {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                        data:patientData,
                        
                    }, config)

                    setOpen(false);
                    setIsLoading(false);
                    setSnackBarMessage(response.data.msg);
                    setSnackBarType("success");
                    setSnackBarVisibility(true);

                    


                }
                catch (e) {
                    console.log(e);
                    setOpen(false);
                    setIsLoading(false)
                    setSnackBarMessage(e.response.data.msg);
                    setSnackBarType("error");
                    setSnackBarVisibility(true);
                }


            },
            "prefill": {
                "name": "BookWellCare",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };


        const razor = new window.Razorpay(options);
        razor.on('payment.failed', function (response) {
            alert("payment failed, try again")
        });
        razor.open();

       }
        catch (e) {
            console.log(`error ${e}`);
            setIsLoading(false)
            setSnackBarMessage(e.response.data.msg);
            setSnackBarType("error");
            setSnackBarVisibility(true);
           
        }}

    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const data = state.details;
   
    return (

        <>
            <Header />

            {customSnackBar()}

            <React.Fragment>


                <Dialog open={open} onClose={handleClose}>

                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogContent>


                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            onChange={handleChange}
                            label="Phone Number"
                            type="number"

                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            autoFocus
                            onChange={handleChange}
                            margin="dense"
                            name="age"
                            label="Age"
                            type="email"
                            fullWidth
                            variant="standard"
                        />


                        <h1 className="mt-4">Gender</h1>
                        <label >
                            <input className="mt-4 mr-2"
                                type="radio"
                                value="Male"
                                checked={selectedValue === 'Male'}
                                onChange={handleRadioChange}
                            />
                            Male
                        </label>

                        <label>
                            <input className="mx-2 ml-8"
                                type="radio"
                                value="Female"
                                checked={selectedValue === 'Female'}
                                onChange={handleRadioChange}
                            />
                            Female
                        </label>


                        <br />


                        <h1 className="mt-4">Date</h1>
                        <label >
                            <input className="mt-4 mr-2"
                                type="radio"
                                value="Today"
                                checked={selectedDate === 'Today'}
                                onChange={handleDateChange}
                            />
                            Today
                        </label>

                        <label>
                            <input className="mx-2 ml-8"
                                type="radio"
                                value="Tomorrow"
                                checked={selectedDate === 'Tomorrow'}
                                onChange={handleDateChange}
                            />
                            Tomorrow
                        </label>







                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={bookAppointment}>{isLoading ? <CircularProgress /> : "Book Appointment"}</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <div className="my-24 mx-10 p-5 min-h-max grid grid-cols-1 justify-center items-center rounded-lg bg-white">

                <div className="text-center flex flex-col justify-center items-center">


                    <Avatar className="mt-4" sx={{
                        width: 65, height: 65,
                        bgcolor: "#A0C2EF"
                    }}><h1 className="text-5xl ">{data&&data.name[4]  }</h1></Avatar>
                    <h1 className="mb-8 mt-4 text-xl font-medium md:text-2xl">{}</h1>
                </div>



                <div className="mb-4">
                    <TableContainer className="" component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody >
                                <TableRow>
                                    <TableCell> <b> Name </b></TableCell>
                                    <TableCell>{data&&data.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Age  </b></TableCell>
                                    <TableCell>{data&&data.age}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Speciality  </b></TableCell>
                                    <TableCell>{data&&data.category}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Hospital  </b></TableCell>
                                    <TableCell>{data&&data.education}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Experience  </b></TableCell>
                                    <TableCell>{data&&data.experience} Years</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Contact  </b></TableCell>
                                    <TableCell>{data&&data.phoneNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Timings  </b></TableCell>
                                    <TableCell>{data&&data.startTime} - {data&&data.endTime}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> <b> Fees (in Rs)  </b></TableCell>
                                    <TableCell>{data&&data.fees}</TableCell>
                                </TableRow>


                            </TableBody>




                        </Table>
                    </TableContainer>
                </div>

                <Button variant="contained" onClick={handleClickOpen} disableElevation endIcon={<CallMadeIcon />}>Book Appointment</Button>


            </div>
        </>)




}



