import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
export const UserAndDoctor = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-12 rounded-lg shadow-md min-w-max sm:w-96 m-4">
                <h1 className='text-3xl mb-8 font-medium'>BookWellCare</h1>        <h2 className="text-2xl font-semibold mb-6">Choose Role</h2>

                <div  className="grid grid-cols-1 gap-4">
                    {/* Patient Card */}
                    <div onClick={()=>{navigate("/login")}} className="bg-blue-500 p-4 rounded text-white cursor-pointer hover:bg-blue-600 px-8">
                    <AccountCircleIcon sx={{
                        fontSize:60
                    }}/>
                        <h3 className="text-xl font-semibold mb-2">Login as Patient</h3>
                        <p>Login and manage your health records.</p>
                    </div>

                    {/* Doctor Card */}
                    <div className="bg-green-500 p-4 rounded text-white cursor-pointer hover:bg-green-600">
                    <LocalHospitalIcon sx={{
                        fontSize:60
                    }}/>
                        <h3 className="text-xl font-semibold mb-2">Login as Doctor</h3>
                        <p>Login and access patient records / appointments</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

