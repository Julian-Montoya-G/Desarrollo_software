import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useTasks
} from "../hooks/useTasks";

import useNetwork from "../hooks/useNetwork";

import "./TaskForm.css";


function TaskForm() {

  const navigate = useNavigate();

  const { id } = useParams();


  const {
    tasks,
    addTask,
    updateTask
  } = useTasks();


  const {
    isOnline
  } = useNetwork();


  const editing =
    Boolean(id);


  const existingTask =
    editing

      ? tasks.find(
          (task) =>
            task.id === id
        )

      : null;


  const [title, setTitle] =
    useState("");


  useEffect(() => {

    if (existingTask) {

      setTitle(
        existingTask.title
      );

    }

  }, [existingTask]);


  const handleSubmit =
    async (event) => {

      event.preventDefault();


      if (!isOnline) {

        return;

      }


      if (!title.trim()) {

        return;

      }


      try {

        if (editing) {

          await updateTask(
            id,
            title.trim()
          );

        } else {

          await addTask(
            title.trim()
          );

        }


        navigate("/tasks");

      } catch (error) {

        console.error(
          "Error guardando tarea:",
          error
        );

      }

    };


  return (

    <div className="tasks-container">

      <header className="tasks-header">

        <h1>

          {editing
            ? "Editar tarea"
            : "Nueva tarea"}

        </h1>

      </header>


      <main>

        {!isOnline && (

          <div className="network-warning">

            🔴 Sin conexión a Internet.
            No puedes guardar tareas.

          </div>

        )}


        <form
          onSubmit={handleSubmit}
        >

          <input

            type="text"

            placeholder="Título de la tarea"

            value={title}

            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }

          />


          <button
            type="submit"
            disabled={!isOnline}
          >

            {editing
              ? "Guardar cambios"
              : "Agregar tarea"}

          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/tasks")
            }
          >

            Cancelar

          </button>

        </form>

      </main>

    </div>

  );

}


export default TaskForm;