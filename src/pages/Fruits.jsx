import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import useDexie from "../hooks/useDexie";

import "./Fruits.css";


function Fruits() {

  const navigate =
    useNavigate();


  const {
    fruits,
    add,
    update,
    remove
  } = useDexie();


  const [name, setName] =
    useState("");


  const [editingId, setEditingId] =
    useState(null);


  const [editingName, setEditingName] =
    useState("");


  const handleAdd =
    async (event) => {

      event.preventDefault();


      if (!name.trim()) {

        return;

      }


      await add({

        name:
          name.trim()

      });


      setName("");

    };


  const handleUpdate =
    async (id) => {

      if (!editingName.trim()) {

        return;

      }


      await update(
        id,
        {
          name:
            editingName.trim()
        }
      );


      setEditingId(null);

      setEditingName("");

    };


  const handleDelete =
    async (id) => {

      await remove(id);

    };


  const startEditing =
    (fruit) => {

      setEditingId(
        fruit.id
      );

      setEditingName(
        fruit.name
      );

    };


  return (

    <div className="fruits-page">

      <header className="fruits-header">

        <div>

          <h1>
            Frutas
          </h1>

          <p>
            Gestiona tus frutas
          </p>

        </div>


        <button
          className="fruits-back-button"
          onClick={() =>
            navigate("/tasks")
          }
        >
          Volver
        </button>

      </header>


      <main className="fruits-content">

        <form
          className="fruits-form"
          onSubmit={handleAdd}
        >

          <input
            type="text"
            placeholder="Nombre de la fruta"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
          />


          <button
            type="submit"
          >
            + Agregar fruta
          </button>

        </form>


        <div className="fruits-list">

          {fruits.length === 0 ? (

            <p className="fruits-empty">
              No hay frutas registradas.
            </p>

          ) : (

            fruits.map(
              (fruit) => (

                <div
                  className="fruit-card"
                  key={fruit.id}
                >

                  {editingId === fruit.id ? (

                    <>

                      <input
                        className="fruit-edit-input"
                        type="text"
                        value={editingName}
                        onChange={(event) =>
                          setEditingName(
                            event.target.value
                          )
                        }
                      />


                      <div className="fruit-edit-actions">

                        <button
                          onClick={() =>
                            handleUpdate(
                              fruit.id
                            )
                          }
                        >
                          Guardar
                        </button>


                        <button
                          onClick={() => {

                            setEditingId(null);

                            setEditingName("");

                          }}
                        >
                          Cancelar
                        </button>

                      </div>

                    </>

                  ) : (

                    <>

                      <div className="fruit-name">

                        <div className="fruit-icon">
                          🍎
                        </div>

                        <h3>
                          {fruit.name}
                        </h3>

                      </div>


                      <div className="fruit-actions">

                        <button
                          onClick={() =>
                            startEditing(
                              fruit
                            )
                          }
                        >
                          Editar
                        </button>


                        <button
                          className="fruit-delete"
                          onClick={() =>
                            handleDelete(
                              fruit.id
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>

                    </>

                  )}

                </div>

              )
            )

          )}

        </div>

      </main>

    </div>

  );

}


export default Fruits;