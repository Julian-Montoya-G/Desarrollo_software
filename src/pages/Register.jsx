import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../hooks/useAuth";

import "./Login.css";


function Register() {

  const navigate = useNavigate();

  const {
    register
  } = useAuth();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  const handleRegister = async (event) => {

    event.preventDefault();

    setError("");


    try {

      await register(
        email,
        password
      );

      navigate("/tasks");

    } catch {

      setError(
        "No fue posible crear la cuenta."
      );

    }

  };


  return (

    <div className="login-container">

      <div className="login-card">

        <h1>
          Crear cuenta
        </h1>


        <form onSubmit={handleRegister}>

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

            Crear cuenta

          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
          >

            Volver al Login

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


export default Register;