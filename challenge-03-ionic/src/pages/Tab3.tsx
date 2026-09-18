import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import {
  useEffect,
  useState
} from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  Task
} from "../types/Task";


interface Props {
  logout: () => void;
}


function Tasks({ logout }: Props) {


  const [tasks, setTasks] = useState<Task[]>(() => {

    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "Aprender Ionic",
            completed: false
          },
          {
            id: 2,
            title: "Realizar Challenge 03",
            completed: false
          }
        ];

  });


  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);


  const addTask = (title: string) => {

    const newTask: Task = {

      id: Date.now(),

      title: title,

      completed: false

    };


    setTasks([
      ...tasks,
      newTask
    ]);

  };


  const toggleTask = (id: number) => {

    setTasks(

      tasks.map((task) => {

        if (task.id === id) {

          return {
            ...task,
            completed: !task.completed
          };

        }

        return task;

      })

    );

  };


  const deleteTask = (id: number) => {

    setTasks(

      tasks.filter(
        (task) => task.id !== id
      )

    );

  };


  return (

    <IonPage>


      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Task Manager
          </IonTitle>


          <IonButton
            slot="end"
            color="danger"
            onClick={logout}
          >
            Cerrar sesión
          </IonButton>

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