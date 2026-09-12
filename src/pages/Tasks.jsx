import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import "./Tasks.css";


function Tasks({ logout }) {


  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tasks");


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

      title,

      completed:false,

    };


    setTasks([

      ...tasks,

      newTask

    ]);


  };






  const toggleTask = (id) => {


    const updatedTasks = tasks.map((task)=>{


      if(task.id === id){


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

      (task)=> task.id !== id

    );


    setTasks(updatedTasks);


  };







  return (


    <div className="tasks-container">



      <header className="tasks-header">


        <h1>
          Task Manager
        </h1>



        <button

          className="logout-button"

          onClick={logout}

        >

          Logout

        </button>


      </header>





      <main>


        <TaskForm

          addTask={addTask}

        />



        <TaskList

          tasks={tasks}

          toggleTask={toggleTask}

          deleteTask={deleteTask}

        />


      </main>



    </div>


  );


}


export default Tasks;