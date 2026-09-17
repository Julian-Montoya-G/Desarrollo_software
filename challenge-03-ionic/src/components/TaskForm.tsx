import {
  IonButton,
  IonInput,
  IonItem
} from "@ionic/react";

import {
  useState
} from "react";


interface Props {

    addTask: (title:string)=>void;

}


function TaskForm({addTask}:Props){


    const [title,setTitle] = useState("");



    const handleAdd = ()=>{


        if(title.trim() === ""){

            return;

        }


        addTask(title);

        setTitle("");

    };



    return (

        <>


            <IonItem>

                <IonInput

                    label="Nueva tarea"

                    labelPlacement="floating"

                    placeholder="Escribe una tarea"

                    value={title}

                    onIonInput={(event)=>

                        setTitle(
                            event.detail.value ?? ""
                        )

                    }

                />

            </IonItem>



            <IonButton

                expand="block"

                onClick={handleAdd}

            >

                Agregar tarea

            </IonButton>


        </>

    );


}


export default TaskForm;