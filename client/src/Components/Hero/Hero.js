import "../../index.css";
import React from "react";
import Image from "../../images/heroimg.png"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { IconButton } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header/Header";
const Hero = () => {

    const navigate = useNavigate();

    return (
        <>
           <Header   />
        <motion.div
    
    initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}


    >
            <div className="full-home-container" >
                <div className="home-container">
                    <div className="hero-text  text-center py-10  -mt-12 lg-justify-between lg:text-left sm:text-center md:text-center md:w-full ">
                        <h1 className="mt-8 mb-4 text-[#2C3B7C]  text-3xl text-center lg:text-6xl font-medium lg:text-left md:text-5xl sm:text-4xl">Easiest Way to Find <br /> Your Best <span className="text-green-500"> Doctors</span></h1>
                        <p className="text-gray-400 mb-6 text-center sm:text-left text-sm md:text-lg    ">BookWellCare believes in everyone's right to quality healthcare. <br /> Our mission: empower you with a platform that prioritizes convenience, choice, and personalized care. </p>
                        
                        <button  onClick={()=>{
                            navigate("/findDoctor")
                        }} class="bg-[#2C3B7C] mb-3 text-sm md:text-lg hover:bg-white hover:border-[#2C3B7C] hover:border-2 hover:text-black text-white py-2 px-4 rounded-full duration-700">
                            Book Appointment
                        </button>

                        <button  class="bg-white border-[#2C3B7C] hover:bg-[#2C3B7C] border-2	 text-sm md:text-lg hover:text-white hover: text-[#2C3B7C] py-2 px-4 rounded-full duration-700  md:ml-5">
                            Buy Us A Coffee!
                        </button>
                    </div>

                
                        <div className=" mb-3 -mr-6  md:flex sm:hidden hidden hero-img-container">
                            <img className="img" src={Image} alt="" />

                        </div>


                </div>


            </div>
</motion.div>

<motion.div
    
    initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}


    >

            <div className="card">

                <div className="card-text" >
                    <h1 className="text-lg text-left" >Our System Makes It Easy For Healthcare <br />
                        Collaborate On Pateint Care
                    </h1>
                </div>
                <div className="card-button" >
                    <button class=" text-sm bg-green-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full duration-700 m-2">
                    Explore More
                    </button>
                    <IconButton style={{
                        background: "#22C55E",
                        marginLeft: "5px"
                    }}  >
                    <ArrowOutwardIcon style={{
                        color:"white"
                    }} />
                    </IconButton>
                   

                </div>

            </div>

</motion.div>
        </>
    )


}
export default Hero;