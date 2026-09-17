import {
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
} from "../Types/Task";



function Tasks(){


const [tasks,setTasks] = useState<Task[]>(()=>{


const savedTasks = localStorage.getItem("tasks");


return savedTasks

? JSON.parse(savedTasks)

: [

{

id:1,

title:"Aprender Ionic",

completed:false

},

{

id:2,

title:"Realizar Challenge 03",

completed:false

}

];


});



useEffect(()=>{


localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);


},[tasks]);





const addTask = (title:string)=>{


const newTask:Task={


id:Date.now(),

title,

completed:false


};



setTasks([

...tasks,

newTask

]);


};





const toggleTask = (id:number)=>{


setTasks(

tasks.map(task=>


task.id===id

?

{

...task,

completed:!task.completed

}

:

task


)

);


};





const deleteTask = (id:number)=>{


setTasks(

tasks.filter(

task=>task.id!==id

)

);


};





return(


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