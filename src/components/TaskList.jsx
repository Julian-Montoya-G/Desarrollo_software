import TaskItem from "./TaskItem";

import "./TaskList.css";


function TaskList({
  tasks,
  toggleTask,
  deleteTask
}) {


  return (


    <div className="task-list">


      {
        tasks.length === 0 ? (

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

            />


          ))


        )
      }


    </div>


  );


}


export default TaskList;