import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonButtons,
  IonBadge
} from "@ionic/react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


type VisitStatus =
  | "pendiente"
  | "en_camino"
  | "finalizada";


interface Visit {
  id: number;
  paciente: string;
  hora: string;
  estado: VisitStatus;
}


function VisitDetail() {

  const { id } = useParams();

  const [visit, setVisit] =
    useState<Visit | null>(null);


  useEffect(() => {

    const savedVisits =
      localStorage.getItem("visitas");


    if (!savedVisits) {
      return;
    }


    const visits: Visit[] =
      JSON.parse(savedVisits);


    const foundVisit =
      visits.find(
        (item) =>
          item.id === Number(id)
      );


    if (foundVisit) {
      setVisit(foundVisit);
    }

  }, [id]);


  const updateStatus = () => {

    if (!visit) {
      return;
    }


    let newStatus: VisitStatus =
      visit.estado;


    if (
      visit.estado === "pendiente"
    ) {

      newStatus = "en_camino";

    } else if (
      visit.estado === "en_camino"
    ) {

      newStatus = "finalizada";

    }


    const updatedVisit: Visit = {
      ...visit,
      estado: newStatus
    };


    const savedVisits =
      localStorage.getItem("visitas");


    if (!savedVisits) {
      return;
    }


    const visits: Visit[] =
      JSON.parse(savedVisits);


    const updatedVisits =
      visits.map((item) =>

        item.id === updatedVisit.id
          ? updatedVisit
          : item

      );


    localStorage.setItem(
      "visitas",
      JSON.stringify(updatedVisits)
    );


    setVisit(updatedVisit);

  };


  if (!visit) {

    return (

      <IonPage>

        <IonHeader>

          <IonToolbar>

            <IonButtons slot="start">

              <IonBackButton
                defaultHref="/visitas"
              />

            </IonButtons>


            <IonTitle>
              Detalle
            </IonTitle>

          </IonToolbar>

        </IonHeader>


        <IonContent className="ion-padding">

          <p>
            Visita no encontrada.
          </p>

        </IonContent>

      </IonPage>

    );

  }


  return (

    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonButtons slot="start">

            <IonBackButton
              defaultHref="/visitas"
            />

          </IonButtons>


          <IonTitle>
            Detalle de visita
          </IonTitle>

        </IonToolbar>

      </IonHeader>


      <IonContent className="ion-padding">

        <IonCard>

          <IonCardContent>

            <h2>
              {visit.paciente}
            </h2>


            <p>
              <strong>
                Hora:
              </strong>{" "}
              {visit.hora}
            </p>


            <p>
              <strong>
                Estado:
              </strong>{" "}

              <IonBadge>
                {visit.estado}
              </IonBadge>

            </p>


            {visit.estado ===
              "pendiente" && (

              <IonButton
                expand="block"
                onClick={updateStatus}
              >

                Pasar a en camino

              </IonButton>

            )}


            {visit.estado ===
              "en_camino" && (

              <IonButton
                expand="block"
                color="success"
                onClick={updateStatus}
              >

                Finalizar visita

              </IonButton>

            )}


            {visit.estado ===
              "finalizada" && (

              <p>
                La visita ha sido
                finalizada.
              </p>

            )}

          </IonCardContent>

        </IonCard>

      </IonContent>

    </IonPage>

  );

}


export default VisitDetail;