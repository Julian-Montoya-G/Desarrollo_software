import {
  useEffect,
  useState
} from "react";

import TaskContext from "./TaskContext";


function TaskProvider({ children }) {

  const [tasks, setTasks] = useState(() => {

    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks

      ? JSON.parse(savedTasks)

      : [
          {
            id: 1,
            title: "Aprender React",
            completed: false,
          },
          {
            id: 2,
            title: "Realizar Challenge 05",
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

      title,

      completed: false,

    };


    setTasks((currentTasks) => [

      ...currentTasks,

      newTask

    ]);

  };


  const updateTask = (id, title) => {

    setTasks((currentTasks) =>

      currentTasks.map((task) =>

        task.id === id

          ? {
              ...task,
              title
            }

          : task

      )

    );

  };


  const toggleTask = (id) => {

    setTasks((currentTasks) =>

      currentTasks.map((task) =>

        task.id === id

          ? {
              ...task,
              completed: !task.completed
            }

          : task

      )

    );

  };


  const deleteTask = (id) => {

    setTasks((currentTasks) =>

      currentTasks.filter(
        (task) => task.id !== id
      )

    );

  };


  const value = {

    tasks,

    addTask,

    updateTask,

    toggleTask,

    deleteTask

  };


  return (

    <TaskContext.Provider value={value}>

      {children}

    </TaskContext.Provider>

  );

}


export default TaskProvider;
