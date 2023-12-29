import axios from "axios";
import { useEffect, useState } from "react";
import {AppointmentCard} from "./AppointmentCard"

export const AppointmentsSection = () => {



    const [TodayAppointments, setTodayAppointments] = useState([]);
   


    function getTodayFullDate() {
        const date = new Date();
        const onlyDate = date.getDate();
        const onlyMonth = date.getMonth() + 1;
        const onlyYear = date.getFullYear();

        return (onlyDate + "-" + onlyMonth + "-" + onlyYear)

    }


    useEffect(() => {
        const todayDate = getTodayFullDate();


        async function getTodayAppointments() {
            const date = new Date();
            try {
                const { data: { msg: { appointedSlot } } } = await axios.get(`http://localhost:8080/getTodayAppointments?date=${todayDate}&email=${localStorage.getItem("email")}`)
                setTodayAppointments(appointedSlot)
            }
            catch (e) {
                console.log(`${e}`);
            }
        }
        getTodayAppointments()
    }, [])



    return (
        <>
            <h1 className='text-3xl m-4 bg-white p-2 py-4 rounded-lg uppercase shadow-lg font-bold'>Today Appointments</h1>

           { TodayAppointments.length!=0? <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 '>


                {TodayAppointments.map((slot) => <AppointmentCard key={Math.random()} props={slot} />)}

            </div>:<h1 className="text-2xl m-4  rounded-lg">No Appointments for Today Yet !</h1>}

        </>
    )
}