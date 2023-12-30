import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"

export const BookedAppointmentsCard = ({data}) => {


    return (
        <div className="my-4 shadow-lg mx-10 p-5 min-h-max grid grid-cols-1 justify-center items-center rounded-lg bg-white">





        <div className="mb-4 ">
            <TableContainer className="" >
                <Table aria-label="simple table">
                    <TableBody >
                        <TableRow>
                            <TableCell> <b> Doctor Name </b></TableCell>
                            <TableCell>{data.doctorName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <b>  Doctor Phone Number  </b></TableCell>
                            <TableCell>{data.doctorPhone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <b> Patient Name </b></TableCell>
                            <TableCell>{data.patientName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <b> Patient Age </b></TableCell>
                            <TableCell>{data.age}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <b> Patient Phone </b></TableCell>
                            <TableCell>{data.patientPhone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <b> Patient Slot </b></TableCell>
                            <TableCell>{data.slot}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <b>  Appointment Date </b></TableCell>
                            <TableCell>{data.date}</TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell> <b>  Timing </b></TableCell>
                            <TableCell>{data.startTime} - {data.endTime}</TableCell>
                        </TableRow>
                                                <TableRow>
                            <TableCell> <b>  Amount Paid</b></TableCell>
                            <TableCell>{data.fees}</TableCell>
                        </TableRow>
                        
                       
                       
                      
                      
                      

                    </TableBody>




                </Table>
            </TableContainer>
<br />

        </div>




    </div>
    )

}