import React from "react";
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import report from "../../images/patient.png"
import find from "../../images/find.png"
import calendar from "../../images/calendar.png"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
export const ServicesContainer = () => {

const navigate = useNavigate();







    return (

        <motion.div
    
    initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}


    >
        <div className="grid bg-white p-10 rounded-2xl  gap-4 md:grid-cols-4 m-10 servicesContainer">

            <div className="text-center  md:text-left">
                <h1 className="text-4xl font-medium mb-2">Our Services</h1>
                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <button class="bg-green-500 hover:bg-white m-2  hover:text-black text-white font-bold py-2 px-4 rounded-full duration-700">
                    Explore More
                </button>
                <IconButton style={{
                    background: "#22C55E",
                    marginLeft: "5px"
                }}  >
                    <ArrowOutwardIcon style={{
                        color: "white"
                    }} />
                </IconButton>
            </div>



            {/* 1 */}
            <div className="flex py-4 flex-col justify-center items-center servicesCard">
                <div className="w-16  md:w-28 mb-5">
                    <img src={calendar} alt="" />
                </div>
                <div className="flex flex-row justify-center items-center">

                    
                    <Button onClick={()=>{
                        navigate("/appointments")
                    }}  variant="outlined" endIcon={<ArrowOutwardIcon />}>
                        Appointments
                    </Button>
                </div>
            </div>


            {/* 2 */}
            <div className="flex py-4 flex-col justify-center items-center servicesCard">
                <div className="w-16  md:w-28 mb-5">
                    <img src={find} alt="" />
                </div>
                <div className="flex flex-row justify-center items-center">

                    <Button onClick={()=>{
                        navigate("/findDoctor")
                    }}  variant="outlined" endIcon={<ArrowOutwardIcon />}>
                        Find Doctor
                    </Button>
                </div>
            </div>

            {/* 3 */}
            <div className="flex py-4 flex-col justify-center items-center servicesCard">
                <div className="w-16  md:w-28 mb-5">
                    <img src={report} alt="" />
                </div>
                <div className="flex flex-row justify-center items-center">

                <Button onClick={()=>{
                        navigate("/reports")
                    }}  variant="outlined" endIcon={<ArrowOutwardIcon />}>
                       Save Reports
                    </Button>
                </div>
            </div>



        </div>
        </motion.div>
    )
}