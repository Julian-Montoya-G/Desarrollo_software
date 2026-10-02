import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../hooks/useAuth";

import "./Login.css";


function Login() {

  const navigate = useNavigate();

  const {
    login
  } = useAuth();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");


    try {

      await login(
        email,
        password
      );

      navigate("/tasks");

    } catch {

      setError(
        "Correo o contraseña incorrectos."
      );

    }

  };


  return (

    <div className="login-container">

      <div className="login-card">

        <h1>
          Task Manager
        </h1>


        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />


          <input
            type="password"
            placeholder="Ingrese contraseña"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />


          <button type="submit">
            Login
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