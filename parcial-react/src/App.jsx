import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import PatientsPage from "./pages/PatientsPage";


function App(){


  const [logged,setLogged] = useState(

    localStorage.getItem("logged")

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

    logged ?

    <PatientsPage logout={logout}/>

    :

    <LoginPage login={login}/>

  );


}


export default App;