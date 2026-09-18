import {
  IonApp,
  setupIonicReact
} from "@ionic/react";


import {
  useState
} from "react";


import Login from "./pages/Login";
import Tasks from "./pages/Tasks";



/* Ionic CSS */

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";

import "@ionic/react/css/palettes/dark.system.css";


import "./theme/variables.css";



setupIonicReact();



function App(){


const [logged,setLogged] = useState(

  localStorage.getItem("logged") === "true"

);





const handleLogin = ()=>{


setLogged(true);


};





const handleLogout = ()=>{


localStorage.removeItem(
  "logged"
);


setLogged(false);


};





return (

<IonApp>


{

logged

?

<Tasks logout={handleLogout}/>

:

<Login onLogin={handleLogin}/>

}



</IonApp>

);


}



export default App;