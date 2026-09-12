import PatientItem from "./PatientItem";


function PatientList({ patients }) {


  return (

    <div className="patient-list">


      {
        patients.length === 0 ? (

          <p>
            No hay pacientes registrados
          </p>


        ) : (


          patients.map((patient) => (

            <PatientItem

              key={patient.id}

              patient={patient}

            />

          ))


        )
      }


    </div>

  );


}


export default PatientList;