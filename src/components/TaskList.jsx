import {
  IonList
} from "@ionic/react";

import TaskItem from "./TaskItem";


function TaskList({
  tasks,
  toggleTask,
  deleteTask
}) {

  return (

    <IonList className="ion-margin-top">

      {tasks.map((task) => (

        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

      ))}

    </IonList>

  );

}

export default TaskList;