import Dexie from "dexie";


const db = new Dexie("Challenge06DB");


db.version(1).stores({

  fruits: "++id, name"

});


export default db;