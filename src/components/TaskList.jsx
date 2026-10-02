import TaskItem from "./TaskItem";

import "../pages/TaskList.css";


function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  isOnline
}) {


  return (

    <div className="task-list">

      {tasks.length === 0 ? (

        <p className="empty-message">

          No hay tareas disponibles

        </p>

      ) : (

        tasks.map((task) => (

          <TaskItem

            key={task.id}

            task={task}

            toggleTask={toggleTask}

            deleteTask={deleteTask}

            isOnline={isOnline}

          />

        ))

      )}

    </div>

  );

}


export default TaskList;