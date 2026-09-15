import { IonApp, setupIonicReact } from "@ionic/react";

import Tasks from "./pages/Tasks";

/* Ionic Core CSS */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utilities */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";

import "./App.css";


setupIonicReact();


function App() {

  return (

    <IonApp>

      <Tasks />

    </IonApp>

  );

}


export default App;