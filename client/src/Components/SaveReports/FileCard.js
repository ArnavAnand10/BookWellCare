import { Button } from "@mui/material"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../../src/App.css"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const SaveReportsCard = ({ props }) => {


    const navigate= useNavigate();
    const myArray = ['blue', 'red', 'green', 'yellow'];


    const deleteFile = async () => {

        try {
            const config = {
                headers:{
                    "content-type":"application/json"
                }
            }
            const response = await axios.post(`http://localhost:8080/deleteFile`,{username:localStorage.getItem("username"), file:props.pdf}, config)
            window.alert("Report Deleted Successfully")
            window.location.reload(); 
           
        }catch(e){
            window.alert("Error Deleting Report")
            console.log(e);
        }

        
    }


    return (<div id="fileCard" key={Math.random()} className={`py-6 px-10  gap-4 flex flex-col bg-blue-100 shadow-lg rounded-lg `}>

        <h1 className=" text-md md:text-xl capitalize"> <span className="font-semibold " >Title</span> : {props.title}</h1>
        <Button
            disableElevation
            startIcon={<PictureAsPdfIcon />}
            onClick={() => {
                window.open(`http://localhost:8080/files/${props.pdf}`)

            }}
            variant="contained">
            Show Pdf </Button>

        <Button
            color="error"
            disableElevation
            startIcon={<DeleteIcon />}
            onClick={deleteFile}
            variant="outlined">
            Delete  </Button>





    </div>)

}

