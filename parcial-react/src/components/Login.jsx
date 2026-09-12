import { useState } from "react";

import "./Login.css";


function Login({ login }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = "doctor@mediclinic.com";
    const pass = "123456";

    if (
      email === user &&
      password === pass
    ) {
      setError("");
      login();
    } else {

      setError(
        "Correo o contraseña incorrectos"
      );
    }
  };

  return (

    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="brand">
            <div className="logo-circle">
              +
            </div>
            <h1>
              MediClinic
            </h1>
          </div>

          <p className="subtitle">
            Gestión inteligente de pacientes
          </p>

          <form
            onSubmit={handleSubmit}
          >

            <div className="input-group">

              <label>
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="doctor@mediclinic.com"
                value={email}
                onChange={(e)=>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <label>
                Contraseña
              </label>

              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e)=>
                  setPassword(e.target.value)
                }
              />
            </div>

            {
              error && (
                <p className="error-message">
                  {error}
                </p>
              )
            }
            <button
              type="submit"
            >
              Ingresar
            </button>
          </form>

          <p className="footer-text">
            Plataforma médica MediClinic
          </p>
        </div>
      </div>
    </div>
  );

}

export default Login;