import { useEffect, useState } from "react";

import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import "./PatientsPage.css";

function PatientsPage({ logout }) {


  const [patients, setPatients] = useState(() => {

    const savedPatients =
      localStorage.getItem("patients");


    return savedPatients
      ? JSON.parse(savedPatients)
      : [];

  });



  const [search, setSearch] = useState("");



  useEffect(() => {

    localStorage.setItem(

      "patients",

      JSON.stringify(patients)

    );

  }, [patients]);





  const addPatient = (patient) => {


    const newPatient = {


      id: Date.now(),

      ...patient


    };


    setPatients([

      ...patients,

      newPatient

    ]);


  };





  const filteredPatients = patients.filter(

    (patient) =>


      patient.nombre
        .toLowerCase()
        .includes(search.toLowerCase())


      ||

      patient.apellido
        .toLowerCase()
        .includes(search.toLowerCase())


      ||

      patient.cc
        .includes(search)


  );


  return (

    <div className="app-container">


        <header className="top-bar">


        <div>

            <h1>
            MediClinic
            </h1>


            <p>
            Gestión de pacientes
            </p>


            </div>


            <button
            className="logout-btn"
            onClick={logout}    
            >

            Cerrar sesión

            </button>


            </header>


                <section className="search-section">


            <input

            className="search-input"
            type="text"
            placeholder="Buscar paciente..."

            value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</section>





<section className="content-grid">


<div className="panel">


<h2>
Nuevo paciente
</h2>


<PatientForm
addPatient={addPatient}
/>


</div>





<div className="panel">


<h2>
Pacientes registrados
</h2>


<PatientList

patients={filteredPatients}

/>

</div>

</section>

</div>

);


}


export default PatientsPage;