import { Autocomplete, Button, LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import axios from "axios";
import { FindDoctorCard } from "./FindDoctorCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import Header from "../Header/Header";


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



const FindDoctorPage = () => {
    const navigate = useNavigate();
    
    
    const [category, setCategory] = useState("none");
    const [location, setLocation] = useState("none");
    const [loading, setLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(()=>{
        
    if(!localStorage.getItem("username")){
        navigate("/login");
    }

    },[])


    async function findDoctor() {
        setLoading(true);



        try {


            const url = `http://localhost:8080/fetchDoctorsData?category=${category}&location=${location}`
            const { data: { data } } = await axios.get(url);
           
            setFetchedData(data);
            setLoading(false);


        } catch (e) {
            console.log("Error Occuresd", e);
            setLoading(false);

        }



    }




    return <>

        <Header />
        <motion.div

            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}


        >


            <div className="find-doctor-page">

                <div className="search-bar mx-10 my-24 bg-white p-5 rounded-lg grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between items-center find-bar">

                    <Autocomplete
                        id="location"
                        name="location"
                        onChange={(event, value) => { value != null && setLocation(value.label) }}


                        options={locations}
                        sx={{ maxWidth: 300 }}
                        renderInput={(params) => <TextField {...params} label="Location" />}
                    />

                    <Autocomplete

                        id="category"
                        options={categories}
                        onChange={(event, value) => { value != null && setCategory(value.label) }}

                        sx={{ maxWidth: 300 }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />



                    <Button disableElevation onClick={findDoctor}
                        variant="contained" endIcon={<ArrowOutwardIcon />}>
                        <h1 className="py-2 md:text-lg">Find</h1>
                    </Button>

                </div>

                <div className="bg-white -mt-20 mx-10 rounded-lg  p-5 min-h-[50%] grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4	doctor-card-container">


                    {loading ? <LinearProgress /> : fetchedData && fetchedData.map(data => {
                        return (<FindDoctorCard props={data} key={Math.random()} />)
                    })}



                </div>
            </div>
        </motion.div>
    </>
}

export default FindDoctorPage;