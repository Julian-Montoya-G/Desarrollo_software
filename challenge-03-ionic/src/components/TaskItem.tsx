import {

IonButton,

IonCheckbox,

IonItem,

IonLabel

} from "@ionic/react";


import {
    Task
} from "../Types/Task";



interface Props{

    task:Task;

    toggleTask:(id:number)=>void;

    deleteTask:(id:number)=>void;

}



function TaskItem({
    task,
    toggleTask,
    deleteTask
}:Props){



return (

<IonItem>


<IonCheckbox

slot="start"

checked={task.completed}

onIonChange={()=>toggleTask(task.id)}

/>



<IonLabel>


<h2

style={{

textDecoration:
task.completed
? "line-through"
: "none"

}}

>

{task.title}

</h2>


</IonLabel>



<IonButton

color="danger"

onClick={()=>deleteTask(task.id)}

>

Eliminar

</IonButton>



</IonItem>

);


}


export default TaskItem;