import {
  useNavigate
} from "react-router-dom";

import "../pages/TaskItem.css";


function TaskItem({
  task,
  toggleTask,
  deleteTask,
  isOnline
}) {

  const navigate =
    useNavigate();


  return (

    <div className="task-item">

      <input

        type="checkbox"

        checked={task.completed}

        disabled={!isOnline}

        onChange={() =>
          toggleTask(
            task.id
          )
        }

      />


      <span

        className={
          task.completed
            ? "completed"
            : ""
        }

        onClick={() => {

          navigate(
            `/tasks/${task.id}`
          );

        }}

        style={{
          cursor: "pointer"
        }}

      >

        {task.title}

      </span>


      <button

        className="delete-button"

        disabled={!isOnline}

        onClick={() =>
          deleteTask(
            task.id
          )
        }

      >

        Eliminar

      </button>

    </div>

  );

}


export default TaskItem;