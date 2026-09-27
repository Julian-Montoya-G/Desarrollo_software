import { useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useTasks } from "../hooks/useTasks";

import "./TaskForm.css";


function TaskForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    tasks,
    addTask,
    updateTask
  } = useTasks();


  const editing = Boolean(id);


  const existingTask = editing
    ? tasks.find(
        (task) =>
          task.id.toString() === id
      )
    : null;


  const [title, setTitle] = useState(
    existingTask?.title || ""
  );


  const handleSubmit = (event) => {

    event.preventDefault();


    if (!title.trim()) {
      return;
    }


    if (editing) {

      updateTask(
        Number(id),
        title.trim()
      );

    } else {

      addTask(
        title.trim()
      );

    }


    navigate("/tasks");

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

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />


          <button type="submit">

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