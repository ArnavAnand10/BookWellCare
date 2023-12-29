import axios from "axios";
import { useEffect, useState } from "react";
import { BookedAppointmentsCard } from "./BookedAppointmentsCard";
import Header from "../Header/Header";

export const BookedAppointments = () => {

    const [bookedAppointments, setBookedAppointments] = useState([]);

    const username = localStorage.getItem("username");

    useEffect(() => {

        // making get reuest to server for fetching booked appointments
        async function fetchAppointments() {

            try {

                const response = await axios.get(`http://localhost:8080/bookedAppointments?username=${username}`);

                setBookedAppointments(response.data.appointments);



            }
            catch (e) {
                console.log(`error ${e}`);
            }






        }
        fetchAppointments();
    }
        , [])

    return (
        <>
            <Header />
            <h1 className="mt-24 text-2xl md:text-4xl shadow-lg bg-white mx-10 rounded-lg py-4  text-black font-medium ">Booked Appointments</h1>
            {bookedAppointments.length !== 0 ? (
                bookedAppointments.map((appointment) => <BookedAppointmentsCard key={Math.random()} data={appointment} />)
            ) : (
                <h1 className="mt-8 text-2xl">You Have not Booked Any Appointments Yet</h1>
            )}

        </>
    )



}