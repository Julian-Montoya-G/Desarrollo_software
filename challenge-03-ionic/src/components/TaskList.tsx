import {
    IonList
} from "@ionic/react";


import TaskItem from "./TaskItem";


import {
    Task
} from "../Types/Task";



interface Props{

    tasks:Task[];

    toggleTask:(id:number)=>void;

    deleteTask:(id:number)=>void;

}



function TaskList({
    tasks,
    toggleTask,
    deleteTask
}:Props){



return (

<IonList>


{

tasks.map((task)=>(


<TaskItem

key={task.id}

task={task}

toggleTask={toggleTask}

deleteTask={deleteTask}

/>


))


}


</IonList>

);


}


export default TaskList;