import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonAvatar
} from "@ionic/react";


interface Props {
  logout: () => void;
}


function Perfil({ logout }: Props) {

  return (

    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Perfil
          </IonTitle>

        </IonToolbar>

      </IonHeader>


      <IonContent className="ion-padding">

        <div className="page-container">

          <h1 className="section-title">
            Mi perfil
          </h1>

          <p className="section-subtitle">
            Información de la sesión actual.
          </p>


          <IonCard>

            <IonCardContent>


              <IonAvatar
                style={{
                  width: "90px",
                  height: "90px",
                  margin: "0 auto 20px"
                }}
              >

                <img
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  alt="Usuario"
                />

              </IonAvatar>


              <h2
                style={{
                  textAlign: "center",
                  color: "#f8fafc"
                }}
              >
                Doctor MediClinic
              </h2>


              <p
                style={{
                  textAlign: "center"
                }}
              >
                user@mail.com
              </p>


              <p
                style={{
                  textAlign: "center"
                }}
              >
                Médico
              </p>


              <IonButton
                expand="block"
                color="danger"
                onClick={logout}
              >
                Cerrar sesión
              </IonButton>


            </IonCardContent>

          </IonCard>

        </div>

      </IonContent>

    </IonPage>

  );

}


export default Perfil;