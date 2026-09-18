import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import {
  useState
} from "react";


interface Props {

  onLogin: () => void;

}



function Login({ onLogin }: Props) {


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleLogin = () => {


    if (
      email === "user@mail.com" &&
      password === "123"
    ) {


      localStorage.setItem(
        "logged",
        "true"
      );


      onLogin();


    } else {


      alert(
        "Usuario o contraseña incorrectos"
      );


    }


  };



  return (

    <IonPage>


      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Task Manager
          </IonTitle>

        </IonToolbar>

      </IonHeader>



      <IonContent className="ion-padding">


        <IonCard>


          <IonCardContent>


            <IonItem>

              <IonInput

                label="Correo"

                labelPlacement="floating"

                placeholder="Ingrese su correo"

                value={email}

                onIonInput={(event) =>
                  setEmail(
                    event.detail.value ?? ""
                  )
                }

              />

            </IonItem>



            <IonItem>

              <IonInput

                type="password"

                label="Contraseña"

                labelPlacement="floating"

                placeholder="Ingrese su contraseña"

                value={password}

                onIonInput={(event) =>
                  setPassword(
                    event.detail.value ?? ""
                  )
                }

              />

            </IonItem>



            <IonButton

              expand="block"

              className="ion-margin-top"

              onClick={handleLogin}

            >

              Ingresar

            </IonButton>



          </IonCardContent>


        </IonCard>


      </IonContent>


    </IonPage>

  );


}


export default Login;