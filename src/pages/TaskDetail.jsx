import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useTasks
} from "../hooks/useTasks";

import "./TaskDetail.css";


function TaskDetail() {

  const {
    id
  } = useParams();

  const navigate =
    useNavigate();


  const {
    tasks
  } = useTasks();


  const task = tasks.find(
    (task) =>
      task.id.toString() === id
  );


  if (!task) {

    return (

      <div className="task-detail-page">

        <div className="task-detail-card">

          <h1>
            Tarea no encontrada
          </h1>


          <button
            className="task-detail-button primary"
            onClick={() =>
              navigate("/tasks")
            }
          >
            Volver a tareas
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="task-detail-page">

      <div className="task-detail-card">

        <div className="task-detail-header">

          <span className="task-detail-label">
            DETALLE DE TAREA
          </span>

          <h1>
            {task.title}
          </h1>

        </div>


        <div className="task-detail-status">

          <span>
            Estado
          </span>

          <strong
            className={
              task.completed
                ? "completed-status"
                : "pending-status"
            }
          >
            {task.completed
              ? "Completada"
              : "Pendiente"}
          </strong>

        </div>


        <div className="task-detail-actions">

          <button
            className="task-detail-button secondary"
            onClick={() =>
              navigate("/tasks")
            }
          >
            Volver a tareas
          </button>


          <button
            className="task-detail-button primary"
            onClick={() =>
              navigate(
                `/tasks/${task.id}/edit`
              )
            }
          >
            Editar tarea
          </button>

        </div>

      </div>

    </div>

  );

}


export default TaskDetail;