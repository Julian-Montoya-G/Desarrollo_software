import { useState } from "react";

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

import {
  Navigate,
  Route
} from "react-router-dom";

import {
  calendar,
  people,
  person
} from "ionicons/icons";


import Login from "./pages/Login";
import Visitas from "./pages/Visitas";
import VisitDetail from "./pages/VisitDetail";
import Pacientes from "./pages/Pacientes";
import Perfil from "./pages/Perfil";


import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";
import "./theme/app.css";


setupIonicReact();


const App: React.FC = () => {

  const [logged, setLogged] = useState<boolean>(
    () => localStorage.getItem("logged") === "true"
  );


  const login = () => {

    localStorage.setItem(
      "logged",
      "true"
    );

    setLogged(true);

  };


  const logout = () => {

    localStorage.removeItem(
      "logged"
    );

    setLogged(false);

  };


  return (

    <IonApp>

      <IonReactRouter>

        {!logged ? (

          <Login
            login={login}
          />

        ) : (

          <IonTabs>

            <IonRouterOutlet>

              <Route
                path="/visitas"
                element={<Visitas />}
              />

              <Route
                path="/visitas/:id"
                element={<VisitDetail />}
              />

              <Route
                path="/pacientes"
                element={<Pacientes />}
              />

              <Route
                path="/perfil"
                element={
                  <Perfil
                    logout={logout}
                  />
                }
              />

              <Route
                path="/"
                element={
                  <Navigate
                    to="/visitas"
                    replace
                  />
                }
              />

            </IonRouterOutlet>


            <IonTabBar slot="bottom">

              <IonTabButton
                tab="visitas"
                href="/visitas"
              >

                <IonIcon
                  icon={calendar}
                />

                <IonLabel>
                  Visitas
                </IonLabel>

              </IonTabButton>


              <IonTabButton
                tab="pacientes"
                href="/pacientes"
              >

                <IonIcon
                  icon={people}
                />

                <IonLabel>
                  Pacientes
                </IonLabel>

              </IonTabButton>


              <IonTabButton
                tab="perfil"
                href="/perfil"
              >

                <IonIcon
                  icon={person}
                />

                <IonLabel>
                  Perfil
                </IonLabel>

              </IonTabButton>

            </IonTabBar>

          </IonTabs>

        )}

      </IonReactRouter>

    </IonApp>

  );

};


export default App;