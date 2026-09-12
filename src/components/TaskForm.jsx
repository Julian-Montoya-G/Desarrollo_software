import { useState } from "react";

import "./TaskForm.css";


function TaskForm({ addTask }) {


  const [title, setTitle] = useState("");



  const handleSubmit = (e) => {


    e.preventDefault();



    if(title.trim() === ""){

      return;

    }



    addTask(title);



    setTitle("");


  };





  return (


    <form

      className="task-form"

      onSubmit={handleSubmit}

    >


      <input


        type="text"


        placeholder="Escribe una nueva tarea"


        value={title}


        onChange={(e)=>

          setTitle(e.target.value)

        }


      />



      <button

        type="submit"

      >

        Agregar tarea


      </button>



    </form>


  );


}


export default TaskForm;