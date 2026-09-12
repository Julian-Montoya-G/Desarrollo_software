import { useState } from "react";
import "./PatientForm.css";

function PatientForm({ addPatient }) {
  const [patient, setPatient] = useState({
    nombre:"",
    apellido:"",
    cc:"",
    telefono:""
  });

  const handleChange = (e)=>{
    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    });


  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(
      !patient.nombre ||
      !patient.apellido ||
      !patient.cc
    ){
      alert(
        "Complete los campos obligatorios"
      );
      return;
    }


    addPatient(patient);
    setPatient({
      nombre:"",
      apellido:"",
      cc:"",
      telefono:""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={patient.nombre}
        onChange={handleChange}
      />

      <input
        name="apellido"
        placeholder="Apellido"
        value={patient.apellido}
        onChange={handleChange}
      />


      <input
        name="cc"
        placeholder="CC"
        value={patient.cc}
        onChange={handleChange}
      />


      <input
        name="telefono"
        placeholder="Teléfono"
        value={patient.telefono}
        onChange={handleChange}
      />


      <button>
        Agregar paciente
      </button>


    </form>
  );
}
export default PatientForm;