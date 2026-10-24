import {
  useEffect,
  useState
} from "react";

import {
  onValue,
  push,
  ref,
  set,
  update,
  remove
} from "firebase/database";

import {
  useAuth
} from "../hooks/useAuth";

import {
  realtimeDb
} from "../firebase/config";

import TaskContext from "./TaskContext";


function TaskProvider({
  children
}) {

  const {
    user
  } = useAuth();


  const [tasks, setTasks] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    if (!user) {

      return;

    }


    const tasksReference =
      ref(
        realtimeDb,
        `tasks/${user.uid}`
      );


    const unsubscribe =
      onValue(
        tasksReference,
        (snapshot) => {

          const data =
            snapshot.val();


          if (!data) {

            setTasks([]);

            setLoading(false);

            return;

          }


          const loadedTasks =
            Object.entries(
              data
            ).map(
              ([id, task]) => ({

                id,

                ...task

              })
            );


          setTasks(
            loadedTasks
          );


          setLoading(false);

        }
      );


    return () => {

      unsubscribe();

    };

  }, [user]);


  const addTask =
    async (
      title
    ) => {

      if (!user) {

        throw new Error(
          "Debes iniciar sesión para crear una tarea."
        );

      }


      const tasksReference =
        ref(
          realtimeDb,
          `tasks/${user.uid}`
        );


      const newTaskReference =
        push(
          tasksReference
        );


      await set(
        newTaskReference,
        {

          title:
            title.trim(),

          completed:
            false

        }
      );

    };


  const updateTask =
    async (
      id,
      title
    ) => {

      if (!user) {

        throw new Error(
          "Debes iniciar sesión para actualizar una tarea."
        );

      }


      const taskReference =
        ref(
          realtimeDb,
          `tasks/${user.uid}/${id}`
        );


      await update(
        taskReference,
        {

          title:
            title.trim()

        }
      );

    };


  const toggleTask =
    async (
      id
    ) => {

      if (!user) {

        throw new Error(
          "Debes iniciar sesión para actualizar una tarea."
        );

      }


      const currentTask =
        tasks.find(
          (task) =>
            task.id === id
        );


      if (!currentTask) {

        return;

      }


      const taskReference =
        ref(
          realtimeDb,
          `tasks/${user.uid}/${id}`
        );


      await update(
        taskReference,
        {

          completed:
            !currentTask.completed

        }
      );

    };


  const deleteTask =
    async (
      id
    ) => {

      if (!user) {

        throw new Error(
          "Debes iniciar sesión para eliminar una tarea."
        );

      }


      const taskReference =
        ref(
          realtimeDb,
          `tasks/${user.uid}/${id}`
        );


      await remove(
        taskReference
      );

    };


  const value = {

    tasks:
      user
        ? tasks
        : [],

    loading:
      user
        ? loading
        : false,

    addTask,

    updateTask,

    toggleTask,

    deleteTask

  };


  return (

    <TaskContext.Provider
      value={value}
    >

      {children}

    </TaskContext.Provider>

  );

}


export default TaskProvider;