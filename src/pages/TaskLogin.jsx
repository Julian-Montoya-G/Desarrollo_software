import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../hooks/useAuth";

import "./Login.css";


function TaskLogin() {

  const navigate =
    useNavigate();


  const {
    login
  } = useAuth();


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [error, setError] =
    useState("");


  const handleLogin =
    async (event) => {

      event.preventDefault();

      setError("");


      try {

        await login(
          email,
          password
        );


        navigate(
          "/tasks"
        );


      } catch {

        setError(
          "Correo o contraseña incorrectos."
        );

      }

    };


  return (

    <div className="login-container">

      <div className="login-card">

        <span className="login-label">
          TASK MANAGER
        </span>


        <h1>
          Iniciar sesión
        </h1>


        <p className="login-description">
          Ingresa para administrar
          tus tareas.
        </p>


        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            required
          />


          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            required
          />


          <button type="submit">
            Iniciar sesión
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
          >
            Crear una cuenta
          </button>

        </form>


        {error && (

          <p className="login-error">
            {error}
          </p>

        )}

      </div>

    </div>

  );

}


export default TaskLogin;
