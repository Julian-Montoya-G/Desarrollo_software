import useNetwork from "../hooks/useNetwork";


function NetworkTest() {

  const {
    isOnline
  } = useNetwork();


  return (

    <div className="tasks-container">

      <h1>
        Estado de conexión
      </h1>


      <div>

        {isOnline ? (

          <h2>
            🟢 Conectado a Internet
          </h2>

        ) : (

          <h2>
            🔴 Sin conexión a Internet
          </h2>

        )}

      </div>

    </div>

  );

}


export default NetworkTest;