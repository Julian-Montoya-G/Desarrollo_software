import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonToast
} from "@ionic/react";

import { useState } from "react";


interface LoginProps {

  login: () => void;

}



function Login({login}: LoginProps) {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [showToast,setShowToast] = useState(false);



  const handleLogin = () => {


    if(
      email === "user@mail.com" &&
      password === "123"
    ){


      login();


    }else{


      setShowToast(true);


    }


  };



  return (

    <IonPage>


      <IonHeader>

        <IonToolbar>

          <IonTitle>
            MediClinic
          </IonTitle>

        </IonToolbar>

      </IonHeader>



      <IonContent className="ion-padding">

  <div
    style={{
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >

    <IonCard
      style={{
        width: "100%",
        maxWidth: "420px"
      }}
    >

      <IonCardContent>

        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontWeight: "bold",
            fontSize: "24px",
            color: "white"
          }}
        >
          M
        </div>

        <h1
          style={{
            textAlign: "center",
            color: "#f8fafc",
            marginBottom: "5px"
          }}
        >
          MediClinic
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "25px"
          }}
        >
          Inicia sesión para continuar
        </p>

        <IonItem>

          <IonInput
            label="Email"
            labelPlacement="floating"
            value={email}
            onIonInput={(e) =>
              setEmail(e.detail.value ?? "")
            }
          />

        </IonItem>

        <IonItem>

          <IonInput
            type="password"
            label="Contraseña"
            labelPlacement="floating"
            value={password}
            onIonInput={(e) =>
              setPassword(e.detail.value ?? "")
            }
          />

        </IonItem>

        <IonButton
          expand="block"
          style={{ marginTop: "20px" }}
          onClick={handleLogin}
        >
          Ingresar
        </IonButton>

      </IonCardContent>

    </IonCard>

  </div>

  <IonToast
    isOpen={showToast}
    message="Usuario o contraseña incorrectos"
    duration={2000}
    onDidDismiss={() =>
      setShowToast(false)
    }
  />

</IonContent>


    </IonPage>

  );

}


export default Login;