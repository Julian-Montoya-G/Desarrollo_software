import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Tasks() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "Aprender Ionic",
            completed: false,
          },
          {
            id: 2,
            title: "Realizar Challenge 03",
            completed: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);


  const addTask = (title) => {

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTasks([
      ...tasks,
      newTask
    ]);
  };


  const toggleTask = (id) => {

    const updatedTasks = tasks.map((task) => {

      if (task.id === id) {

        return {
          ...task,
          completed: !task.completed,
        };

      }

      return task;

    });

    setTasks(updatedTasks);
  };


  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };


  return (

    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Task Manager
          </IonTitle>

        </IonToolbar>

      </IonHeader>


      <IonContent className="ion-padding">

        <TaskForm
          addTask={addTask}
        />

        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

      </IonContent>

    </IonPage>

  );
}

export default Tasks;