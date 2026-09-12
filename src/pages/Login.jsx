import { useState } from "react";
import "./Login.css";


function Login({onLogin}) {


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");



    const handleLogin = () => {


        if(
            email === "user@mail.com" &&
            password === "123"
        ){

            localStorage.setItem(
                "logged",
                "true"
            );


            onLogin();


        }else{

            alert(
                "Usuario o contraseña incorrectos"
            );

        }


    };



    return (

        <div className="login-container">


            <div className="login-card">


                <h1>
                    Task Manager
                </h1>


                <input

                    type="email"

                    placeholder="Ingrese su email"

                    value={email}

                    onChange={(e)=>
                        setEmail(e.target.value)
                    }

                />



                <input

                    type="password"

                    placeholder="Ingrese contraseña"

                    value={password}

                    onChange={(e)=>
                        setPassword(e.target.value)
                    }

                />



                <button
                    onClick={handleLogin}
                >

                    Login

                </button>



            </div>


        </div>

    );


}


export default Login;