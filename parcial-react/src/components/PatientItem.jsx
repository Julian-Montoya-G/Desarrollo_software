import "./PatientItem.css";

function PatientItem({ patient }) {


  return (

    <div className="patient-card">
        <h3>
        {patient.nombre} {patient.apellido}
        </h3>
        
      <p>
        <strong>CC:</strong> {patient.cc}
      </p>
      <p>
        <strong>Teléfono:</strong> {patient.telefono}
      </p>
    </div>

  );

}

export default PatientItem;