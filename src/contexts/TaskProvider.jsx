import {
  useEffect,
  useState
} from "react";

import {
  supabase
} from "../lib/supabase";

import {
  useAuth
} from "../hooks/useAuth";

import TaskContext from "./TaskContext";


function TaskProvider({
  children
}) {

  const {
    user
  } = useAuth();


  const [
    tasks,
    setTasks
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);



  useEffect(() => {

    if (!user) {

      setTasks([]);

      setLoading(false);

      return;

    }


    let mounted = true;


    const loadTasks =
      async () => {

        setLoading(true);


        const {
          data,
          error
        } = await supabase

          .from("tasks")

          .select(
            "id, title, completed, user_id, created_at"
          )

          .eq(
            "user_id",
            user.id
          )

          .order(
            "created_at",
            {
              ascending: true
            }
          );


        if (error) {

          console.error(
            "Error cargando tareas:",
            error
          );

          if (mounted) {

            setTasks([]);

          }

          setLoading(false);

          return;

        }


        if (mounted) {

          setTasks(
            data || []
          );

        }


        setLoading(false);

      };


    loadTasks();


    /*
    ========================================
    REALTIME
    ========================================
    */

    const channel =
      supabase

        .channel(
          `tasks-${user.id}`
        )

        .on(

          "postgres_changes",

          {
            event: "*",

            schema: "public",

            table: "tasks",

            filter:
              `user_id=eq.${user.id}`

          },

          () => {

            loadTasks();

          }

        )

        .subscribe();


    return () => {

      mounted = false;

      supabase.removeChannel(
        channel
      );

    };

  }, [user]);


  /*
  ========================================
  CREAR TAREA
  ========================================
  */

  const addTask =
    async (
      title
    ) => {

      if (!user) {

        throw new Error(
          "Debes iniciar sesión para crear una tarea."
        );

      }


      const cleanTitle =
        title.trim();


      if (!cleanTitle) {

        throw new Error(
          "El título de la tarea es obligatorio."
        );

      }


      const {
        data,
        error
      } = await supabase

        .from("tasks")

        .insert({

          title:
            cleanTitle,

          completed:
            false,

          user_id:
            user.id

        })

        .select()

        .single();


      if (error) {

        console.error(
          "Error creando tarea:",
          error
        );

        throw error;

      }


      /*
      Realtime normalmente actualizará
      la lista automáticamente.

      Agregamos también la tarea
      inmediatamente para que la
      interfaz responda rápido.
      */

      setTasks(
        (currentTasks) => [

          ...currentTasks,

          data

        ]
      );

    };


  /*
  ========================================
  ACTUALIZAR TAREA
  ========================================
  */

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


      const cleanTitle =
        title.trim();


      if (!cleanTitle) {

        throw new Error(
          "El título de la tarea es obligatorio."
        );

      }


      const {
        data,
        error
      } = await supabase

        .from("tasks")

        .update({

          title:
            cleanTitle

        })

        .eq(
          "id",
          id
        )

        .eq(
          "user_id",
          user.id
        )

        .select()

        .single();


      if (error) {

        console.error(
          "Error actualizando tarea:",
          error
        );

        throw error;

      }


      setTasks(
        (currentTasks) =>

          currentTasks.map(
            (task) =>

              task.id === id

                ? data

                : task

          )

      );

    };


  /*
  ========================================
  COMPLETAR / DESCOMPLETAR
  ========================================
  */

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


      const {
        data,
        error
      } = await supabase

        .from("tasks")

        .update({

          completed:
            !currentTask.completed

        })

        .eq(
          "id",
          id
        )

        .eq(
          "user_id",
          user.id
        )

        .select()

        .single();


      if (error) {

        console.error(
          "Error cambiando estado de tarea:",
          error
        );

        throw error;

      }


      setTasks(
        (currentTasks) =>

          currentTasks.map(
            (task) =>

              task.id === id

                ? data

                : task

          )

      );

    };


  /*
  ========================================
  ELIMINAR TAREA
  ========================================
  */

  const deleteTask =
    async (
      id
    ) => {

      if (!user) {

        throw new Error(
          "Debes iniciar sesión para eliminar una tarea."
        );

      }


      const {
        error
      } = await supabase

        .from("tasks")

        .delete()

        .eq(
          "id",
          id
        )

        .eq(
          "user_id",
          user.id
        );


      if (error) {

        console.error(
          "Error eliminando tarea:",
          error
        );

        throw error;

      }


      setTasks(
        (currentTasks) =>

          currentTasks.filter(
            (task) =>
              task.id !== id
          )

      );

    };


  /*
  ========================================
  CONTEXTO
  ========================================
  */

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