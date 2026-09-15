import {
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel
} from "@ionic/react";


function TaskItem({
  task,
  toggleTask,
  deleteTask
}) {

  return (

    <IonItem>

      <IonCheckbox
        slot="start"
        checked={task.completed}
        onIonChange={() =>
          toggleTask(task.id)
        }
      />


      <IonLabel>

        <h2
          style={{
            textDecoration:
              task.completed
                ? "line-through"
                : "none",

            opacity:
              task.completed
                ? 0.5
                : 1,
          }}
        >

          {task.title}

        </h2>

      </IonLabel>


      <IonButton
        color="danger"
        fill="outline"
        onClick={() =>
          deleteTask(task.id)
        }
      >

        Eliminar

      </IonButton>

    </IonItem>

  );

}

export default TaskItem;