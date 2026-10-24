import {
  useContext
} from "react";

import MissionContext
  from "../contexts/MissionContext";


export function useMissions() {

  return useContext(
    MissionContext
  );

}