import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
   return SQLite.openDatabase("db.db");
}


export {openDatabase};