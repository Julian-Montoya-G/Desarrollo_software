import {
  IonButton,
  IonInput,
  IonItem
} from "@ionic/react";

import { useState } from "react";


function TaskForm({ addTask }) {

  const [title, setTitle] = useState("");


  const handleAddTask = () => {

    if (title.trim() === "") {
      return;
    }

    addTask(title);

    setTitle("");
  };


  return (

    <div>

      <IonItem>

        <IonInput
          label="Nueva tarea"
          labelPlacement="floating"
          placeholder="Escribe una tarea"
          value={title}
          onIonInput={(event) =>
            setTitle(event.detail.value)
          }
        />

      </IonItem>


      <IonButton
        expand="block"
        onClick={handleAddTask}
        className="ion-margin-top"
      >

        Agregar tarea

      </IonButton>

    </div>

  );

}

export default TaskForm;