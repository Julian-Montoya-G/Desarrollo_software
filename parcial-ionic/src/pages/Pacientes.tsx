import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar
} from "@ionic/react";

import { useState } from "react";

import PatientCard from "../components/PatientCard";


interface Patient {
  id: number;
  nombre: string;
  edad: number;
  telefono: string;
  direccion: string;
}


function Pacientes() {

  const [search, setSearch] = useState("");


  const [patients] = useState<Patient[]>(() => {

    const saved = localStorage.getItem("pacientes");

    if (saved) {
      return JSON.parse(saved);
    }

    const initialPatients: Patient[] = [
      {
        id: 1,
        nombre: "Juan Pérez",
        edad: 35,
        telefono: "3001234567",
        direccion: "Calle 10 #20-30"
      },
      {
        id: 2,
        nombre: "Ana Gómez",
        edad: 42,
        telefono: "3109876543",
        direccion: "Carrera 5 #15-20"
      }
    ];

    localStorage.setItem(
      "pacientes",
      JSON.stringify(initialPatients)
    );

    return initialPatients;
  });


  const filteredPatients = patients.filter((patient) =>
    patient.nombre
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Pacientes
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent className="ion-padding">

        <IonSearchbar
          value={search}
          placeholder="Buscar paciente"
          onIonInput={(e) =>
            setSearch(e.detail.value ?? "")
          }
        />


        {filteredPatients.map((patient) => (

          <PatientCard
            key={patient.id}
            patient={patient}
          />

        ))}

      </IonContent>

    </IonPage>

  );
}


export default Pacientes;