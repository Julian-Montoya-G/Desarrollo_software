import {
  useLiveQuery
} from "dexie-react-hooks";

import db from "../db/database";


function useDexie() {

  const fruits =
    useLiveQuery(
      () => db.fruits.toArray(),
      []
    );


  const add = async (data) => {

    return await db.fruits.add(
      data
    );

  };


  const update = async (
    id,
    data
  ) => {

    return await db.fruits.update(
      id,
      data
    );

  };


  const remove = async (
    id
  ) => {

    return await db.fruits.delete(
      id
    );

  };


  return {

    fruits:
      fruits || [],

    add,

    update,

    remove

  };

}


export default useDexie;