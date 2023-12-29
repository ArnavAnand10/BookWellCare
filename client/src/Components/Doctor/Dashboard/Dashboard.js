// src/components/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {  Outlet, useNavigate } from 'react-router-dom';


const DoctorDashboard = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setOpen(!open);
  };


  


  useEffect(() => {
    
    if (!localStorage.getItem("email")) {
      navigate("/doctorLogin")
    }

    


  }, [])

  return (
    <div className="flex h-screen bg-blue-200">
      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={handleToggleSidebar}
        sx={{
          width: '200px',
          flexShrink: 0,
        }}
      >
        <List>
          <ListItem >
            <h1 className='text-2xl font-bold p-4 uppercase'>Dashboard</h1>
          </ListItem>
          <ListItem button>
          
            <ListItemText   
            
            onClick={()=>{
              navigate("appointments");
              handleToggleSidebar()
              }} 

              sx={{backgroundColor:"#3B82F6", color:"white", padding:"15px", borderRadius:"10px", fontWeight:"bold"}} primary="Appointments" />
          </ListItem>
          
          <ListItem button>
            <ListItemText 

         onClick={()=>{
              navigate("profile");
              handleToggleSidebar()
              }} 

            sx={{backgroundColor:"#3B82F6", color:"white", padding:"15px", borderRadius:"10px", fontWeight:"bold"}} primary="Profile" />
          </ListItem>
          <ListItem onClick={()=>{
            localStorage.removeItem("email");
            navigate("/doctorLogin")
          }} button>
            <ListItemText sx={{ color:"red", padding:"15px", borderRadius:"10px"}}  primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <div className="flex flex-col flex-grow ">
     
        <header className="bg-blue-500 p-4 text-white flex justify-start items-center">
          <IconButton onClick={handleToggleSidebar} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">BookWellCare - Doctor Admin Panel</Typography>
         


        </header>

        {/* Main Content */}


       <Outlet />


      </div>


        

    </div>
  );
};

export default DoctorDashboard;
