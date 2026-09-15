import { useState } from "react";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";


function App() {

  const [logged, setLogged] = useState(
    () => localStorage.getItem("logged") === "true"
  );


  const handleLogin = () => {

    localStorage.setItem(
      "logged",
      "true"
    );

    setLogged(true);

  };


  const handleLogout = () => {

    localStorage.removeItem(
      "logged"
    );

    setLogged(false);

  };


  if (!logged) {

    return (
      <Login
        onLogin={handleLogin}
      />
    );

  }


  return (
    <Tasks
      logout={handleLogout}
    />
  );

}


export default App;