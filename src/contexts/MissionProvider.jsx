import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import {
  db
} from "../firebase/config";

import {
  useAuth
} from "../hooks/useAuth";

import MissionContext from "./MissionContext";


const initialMissions = [

  {
    id: 1,
    title: "Evidencia",
    description:
      "Toma una foto con la cámara del dispositivo.",
    points: 50,
    completed: false
  },

  {
    id: 2,
    title: "Movimiento real",
    description:
      "Muévete y supera la distancia requerida.",
    points: 100,
    completed: false
  },

  {
    id: 3,
    title: "Permanencia activa",
    description:
      "Mantente quieto durante 10 segundos.",
    points: 150,
    completed: false
  }

];


function MissionProvider({ children }) {

  const {
    user
  } = useAuth();


  const [missions, setMissions] =
    useState(initialMissions);

  const [points, setPoints] =
    useState(0);

  const [loading, setLoading] =
    useState(true);


  /*
  ========================================
  CARGAR PROGRESO
  ========================================
  */

  useEffect(() => {

    const loadProgress = async () => {

      if (!user) {

        setMissions(
          initialMissions
        );

        setPoints(0);

        setLoading(false);

        return;

      }


      try {

        /*
        Primero intentamos recuperar
        el progreso guardado localmente.
        */

        const localData =
          localStorage.getItem(
            `missionProgress_${user.uid}`
          );


        if (localData) {

          const parsedData =
            JSON.parse(localData);


          if (parsedData.missions) {

            setMissions(
              parsedData.missions
            );

          }


          if (
            typeof parsedData.points ===
            "number"
          ) {

            setPoints(
              parsedData.points
            );

          }

        }


        /*
        Después consultamos Firebase.
        */

        const missionRef =
          doc(
            db,
            "missionProgress",
            user.uid
          );


        const missionSnapshot =
          await getDoc(
            missionRef
          );


        if (
          missionSnapshot.exists()
        ) {

          const data =
            missionSnapshot.data();


          const firebaseMissions =
            data.missions ||
            initialMissions;


          const firebasePoints =
            typeof data.points === "number"
              ? data.points
              : 0;


          setMissions(
            firebaseMissions
          );

          setPoints(
            firebasePoints
          );


          /*
          Mantenemos también
          una copia local actualizada.
          */

          localStorage.setItem(

            `missionProgress_${user.uid}`,

            JSON.stringify({

              missions:
                firebaseMissions,

              points:
                firebasePoints

            })

          );

        }

      } catch (error) {

        console.error(
          "Error cargando progreso:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadProgress();

  }, [user]);


  /*
  ========================================
  COMPLETAR MISIÓN
  ========================================
  */

  const completeMission =
    async (missionId) => {

      if (!user) {

        console.error(
          "No hay usuario autenticado."
        );

        return false;

      }


      const currentMission =
        missions.find(
          (mission) =>
            mission.id === missionId
        );


      if (
        !currentMission
      ) {

        console.error(
          "Misión no encontrada:",
          missionId
        );

        return false;

      }


      /*
      Evitamos sumar puntos
      dos veces.
      */

      if (
        currentMission.completed
      ) {

        return false;

      }


      const updatedMissions =
        missions.map(
          (mission) =>

            mission.id === missionId

              ? {
                  ...mission,
                  completed: true
                }

              : mission
        );


      const updatedPoints =
        points +
        currentMission.points;


      /*
      Actualizamos React.
      */

      setMissions(
        updatedMissions
      );

      setPoints(
        updatedPoints
      );


      /*
      ========================================
      PERSISTENCIA LOCAL
      ========================================
      */

      const progressData = {

        missions:
          updatedMissions,

        points:
          updatedPoints

      };


      localStorage.setItem(

        `missionProgress_${user.uid}`,

        JSON.stringify(
          progressData
        )

      );


      /*
      ========================================
      PERSISTENCIA FIREBASE
      ========================================
      */

      try {

        await setDoc(

          doc(
            db,
            "missionProgress",
            user.uid
          ),

          progressData,

          {
            merge: true
          }

        );


        console.log(
          "Misión guardada correctamente:",
          missionId
        );


        return true;

      } catch (error) {

        console.error(
          "Error guardando misión en Firebase:",
          error
        );

        /*
        La información permanece
        guardada localmente aunque
        Firebase falle.
        */

        return true;

      }

    };


  /*
  ========================================
  REINICIAR PROGRESO
  ========================================
  */

  const resetProgress =
    async () => {

      if (!user) {

        console.error(
          "No hay usuario autenticado."
        );

        return false;

      }


      /*
      Creamos una copia nueva
      de las misiones iniciales.
      */

      const resetMissions =
        initialMissions.map(
          (mission) => ({
            ...mission,
            completed: false
          })
        );


      const resetPoints = 0;


      const progressData = {

        missions:
          resetMissions,

        points:
          resetPoints

      };


      /*
      ========================================
      ACTUALIZAR ESTADO DE REACT
      ========================================
      */

      setMissions(
        resetMissions
      );

      setPoints(
        resetPoints
      );


      /*
      ========================================
      PERSISTENCIA LOCAL
      ========================================
      */

      localStorage.setItem(

        `missionProgress_${user.uid}`,

        JSON.stringify(
          progressData
        )

      );


      /*
      ========================================
      PERSISTENCIA FIREBASE
      ========================================
      */

      try {

        await setDoc(

          doc(
            db,
            "missionProgress",
            user.uid
          ),

          progressData,

          {
            merge: true
          }

        );


        console.log(
          "Progreso reiniciado correctamente."
        );


        return true;

      } catch (error) {

        console.error(
          "Error reiniciando progreso en Firebase:",
          error
        );


        /*
        Aunque Firebase falle,
        el progreso ya quedó
        reiniciado localmente.
        */

        return true;

      }

    };


  /*
  ========================================
  PROGRESO
  ========================================
  */

  const completedMissions =
    missions.filter(
      (mission) =>
        mission.completed
    ).length;


  const progress =
    missions.length === 0

      ? 0

      : Math.round(

          (
            completedMissions /
            missions.length
          ) * 100

        );


  /*
  ========================================
  CONTEXTO
  ========================================
  */

  const value = {

    missions,

    points,

    completedMissions,

    progress,

    loading,

    completeMission,

    resetProgress

  };


  return (

    <MissionContext.Provider
      value={value}
    >

      {children}

    </MissionContext.Provider>

  );

}


export default MissionProvider;