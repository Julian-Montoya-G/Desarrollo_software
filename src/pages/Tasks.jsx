import { useNavigate } from "react-router-dom";

import TaskList from "../components/TaskList";

import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";

import useNetwork from "../hooks/useNetwork";

import "./Tasks.css";


function Tasks() {

  const navigate = useNavigate();


  const {
    tasks,
    toggleTask,
    deleteTask
  } = useTasks();


  const {
    logout,
    user
  } = useAuth();


  const {
    isOnline
  } = useNetwork();


  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };


  return (

    <div className="tasks-container">

      <header className="tasks-header">

        <div>

          <h1>
            Task Manager
          </h1>

          {user && (

            <p>
              {user.email}
            </p>

          )}

        </div>


        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      <main>

        {!isOnline && (

          <div className="network-warning">

            🔴 Sin conexión a Internet.
            Las acciones de tareas están deshabilitadas.

          </div>

        )}


        <div className="task-navigation">

          <button
            disabled={!isOnline}
            onClick={() =>
              navigate("/tasks/new")
            }
          >
            Nueva tarea
          </button>


          <button
            onClick={() =>
              navigate("/contacts")
            }
          >
            Contactos
          </button>


          <button
            onClick={() =>
              navigate("/fruits")
            }
          >
            Frutas
          </button>

        </div>


        <TaskList

          tasks={tasks}

          toggleTask={toggleTask}

          deleteTask={deleteTask}

          isOnline={isOnline}

        />

      </main>

    </div>

  );

}


export default Tasks;