import { useNavigate } from "react-router-dom";

import TaskList from "../components/TaskList";

import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";

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

        <div className="task-navigation">

          <button
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
            Fruits
          </button>


          <button
            onClick={() =>
              navigate("/network-test")
            }
          >
            Network Test
          </button>


          <button
            onClick={() =>
              navigate("/sensors")
            }
          >
            Challenge 07 - Sensores
          </button>

        </div>


        <TaskList

          tasks={tasks}

          toggleTask={toggleTask}

          deleteTask={deleteTask}

        />

      </main>

    </div>

  );

}


export default Tasks;