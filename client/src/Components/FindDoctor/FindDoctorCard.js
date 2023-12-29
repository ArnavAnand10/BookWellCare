import { Avatar, Button, CircularProgress } from "@mui/material"
import { motion } from "framer-motion"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const FindDoctorCard = ({ props }) => {
    const navigate =  useNavigate();


    useEffect(()=>{
        
        if(!localStorage.getItem("username")){
            navigate("/login");
        }
    
        },[])

    const [loading,setLoading] = useState(false);
  


    const goToDetailsPage = async ()=>{
        setLoading(true);

        try{

            const {data:{details}} = await axios.get(`http://localhost:8080/fetchDoctorDetails?name=${props.name}&phoneNumber=${props.phoneNumber}`)
          
            setLoading(false);
           
            navigate("/doctor",{
                state:{details}
            })

        }   
        catch(e){
            setLoading(false);
            console.log("Error Occurred", e);
        }
    }

    return (
        <motion.div


            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1, }}
            viewport={{ once: true }}

        >
            <div className="bg-blue-50 py-2 px-4 rounded-lg flex flex-col  " >
                <div className="flex flex-row justify-center my-4">
                    <Avatar>{props.name[4]}</Avatar>
                </div>
                <h1 className="text-xl md:text-2xl mb-4 font-medium ">{props.name} </h1>
                <div className="flex flex-row items-stretch justify-between">
                    <h1 className="text-md md:text-lg">{props.location}</h1>
                    <h1 className="text-md md:text-lg">{props.phoneNumber}</h1>
                </div>

                <Button onClick={goToDetailsPage} variant="text" disableElevation> {loading?<CircularProgress/>:"View Details"}</Button>

            </div>
        </motion.div>
    )

}

