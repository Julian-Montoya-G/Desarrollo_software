import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonBadge,
  IonButton
} from "@ionic/react";

import { useNavigate } from "react-router-dom";


interface Visit {
  id: number;
  paciente: string;
  hora: string;
  estado:
    | "pendiente"
    | "en_camino"
    | "finalizada";
}


interface Props {
  visit: Visit;
}


function VisitCard({ visit }: Props) {

  const navigate = useNavigate();


  return (

    <IonCard>

      <IonCardHeader>

        <IonCardTitle>
          {visit.paciente}
        </IonCardTitle>

      </IonCardHeader>


      <IonCardContent>

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


        <IonButton
          expand="block"
          fill="outline"
          onClick={() =>
            navigate(
              `/visitas/${visit.id}`
            )
          }
        >

          Ver detalle

        </IonButton>

      </IonCardContent>

    </IonCard>

  );

}


export default VisitCard;