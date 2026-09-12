import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonViewWillEnter
} from "@ionic/react";

import { useState } from "react";

import VisitCard from "../components/VisitCard";


interface Visit {
  id: number;
  paciente: string;
  hora: string;
  estado: "pendiente" | "en_camino" | "finalizada";
}


const initialVisits: Visit[] = [
  {
    id: 1,
    paciente: "Juan Pérez",
    hora: "08:30 AM",
    estado: "pendiente"
  },
  {
    id: 2,
    paciente: "Ana Gómez",
    hora: "10:00 AM",
    estado: "en_camino"
  },
  {
    id: 3,
    paciente: "Carlos Ruiz",
    hora: "02:30 PM",
    estado: "finalizada"
  }
];


function Visitas() {

  const [visitas, setVisitas] = useState<Visit[]>([]);


  const loadVisits = () => {

    const saved =
      localStorage.getItem("visitas");


    if (saved) {

      const savedVisits: Visit[] =
        JSON.parse(saved);

      setVisitas(savedVisits);

    } else {

      localStorage.setItem(
        "visitas",
        JSON.stringify(initialVisits)
      );

      setVisitas(initialVisits);

    }

  };


  useIonViewWillEnter(() => {

    loadVisits();

  });


  return (

    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Visitas de hoy
          </IonTitle>

        </IonToolbar>

      </IonHeader>


      <IonContent className="ion-padding">

  <div className="page-container">

    <h1 className="section-title">
      Visitas de hoy
    </h1>

    <p className="section-subtitle">
      Consulta y actualiza el estado de tus visitas médicas.
    </p>

    {visitas.map((visit) => (
      <VisitCard
        key={visit.id}
        visit={visit}
      />
    ))}

  </div>

</IonContent>

    </IonPage>

  );

}


export default Visitas;