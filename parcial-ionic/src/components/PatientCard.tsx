import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";


interface Patient {

  id:number;

  nombre:string;

  edad:number;

  telefono:string;

  direccion:string;

}



interface Props {

  patient:Patient;

}



function PatientCard({patient}:Props){


  return (

    <IonCard>


      <IonCardHeader>


        <IonCardTitle>

          {patient.nombre}

        </IonCardTitle>


      </IonCardHeader>



      <IonCardContent>


        <p>

          <strong>
            Edad:
          </strong>

          {" "}

          {patient.edad}

          años

        </p>



        <p>

          <strong>
            Teléfono:
          </strong>

          {" "}

          {patient.telefono}

        </p>



        <p>

          <strong>
            Dirección:
          </strong>

          {" "}

          {patient.direccion}

        </p>



      </IonCardContent>


    </IonCard>

  );


}


export default PatientCard;
