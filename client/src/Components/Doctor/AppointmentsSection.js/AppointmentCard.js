import "../../../../src/App.css"


export const AppointmentCard = ({props})=>{

    return(
        <div className=" bg-white my-4 mx-8 py-4 px-6  shadow-lg rounded-lg text-left patientCard ">

      
        
        <div className='grid  grid-cols-2 text-left ' >
          <h1 className="font-bold " >Patient Name:</h1>
          <h1 className="mb-2" > {props.patientName}</h1>
          
          <h1 className="font-bold "  >Patient Phone:</h1>
          <h1  className="mb-2"> {props.patientPhone}</h1>


          <h1 className="font-bold "  >Patient Age:</h1>
          <h1  className="mb-2" >{props.age}</h1>

          <h1 className="font-bold" > Patient Gender:</h1>
          <h1  className="mb-2">{props.gender}</h1>

          <h1 className="font-bold" >Slot Number:</h1>
          <h1 className="mb-2">{props.slot}</h1>

        </div>

        </div>
    )
}