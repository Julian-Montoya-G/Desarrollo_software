import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../hooks/useAuth";

import "./Login.css";


function Login() {

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


        navigate("/missions");

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
          PARCIAL 2
        </span>


        <h1>
          Misiones
        </h1>


        <p className="login-description">
          Completa las misiones y demuestra
          las capacidades de tu dispositivo.
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


export default Login;