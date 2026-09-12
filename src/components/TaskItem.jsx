import "./TaskItem.css";


function TaskItem({
  task,
  toggleTask,
  deleteTask
}) {


  return (


    <div className="task-item">


      <input

        type="checkbox"

        checked={task.completed}

        onChange={() => 
          toggleTask(task.id)
        }

      />



      <span

        className={
          task.completed
            ? "completed"
            : ""
        }

      >

        {task.title}

      </span>




      <button

        className="delete-button"

        onClick={() =>
          deleteTask(task.id)
        }

      >

        Eliminar

      </button>



    </div>


  );


}


export default TaskItem;