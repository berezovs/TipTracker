import * as SQLite from 'expo-sqlite';


let db=null;

const createDatabase = () => {
    if(!db)
        db = SQLite.openDatabase("db.db");
//    console.log(db)
}

const createTipsTable = () =>{
    // db.transaction((tx)=>{
    //     tx.executeSql("drop table tips", [], (_,r)=>{}, (error)=>{console.log('error')})
    // })
   db.transaction((transaction)=>{

      transaction.executeSql("create table if NOT EXISTS tips (id integer primary key autoincrement, tip text NOT null, message text NOT null, date text NOT null, week text NOT NULL);", (transaction, result)=>{
          console.log(result,"Success");
      });
  })
}

const queries = {
   selectQueries : { 
   0: "select id, tip, message, date from tips where strftime('%W', date)=strftime('%W', 'now')",
   1: "select id, tip, message, date from tips where strftime('%m', date)=strftime('%m', 'now')",
   2: "select id, tip, message, date from tips where strftime('%Y', date)=strftime('%Y', 'now')",
},
   insertQueries: {insertTip: "insert into tips(tip, message, date, week) values(?, ?, ?,  strftime('%W', ?));"},
   deleteQueries: {deleteTipById: "delete from tips where id=?;"}
  
}

const getTipsForSelectedPeriod = (mode, setTips) =>{
   db.transaction((transaction)=>{
      transaction.executeSql(queries.selectQueries[mode], [], (_, {rows: {_array}})=>{
      if(_array)
         setTips(calculateTips(_array));
      });
   });
}

const insertTip = (tip, message, stringDate) => {
   db.transaction(async (transaction)=>{
      await transaction.executeSql(queries.insertQueries.insertTip, [tip, message, stringDate, stringDate ] ) 
      }); 
}

const getArrayOfTipObj = (mode, setTipsArray) =>{
   db.transaction((transaction)=>{
      transaction.executeSql(queries.selectQueries[mode], [], (_,{rows:{_array}})=>{
         setTipsArray(_array);
      });
   });
}

const deleteTipById = (id, setSuccessDelete) =>{
   db.transaction( async(transaction)=>{
     await transaction.executeSql(queries.deleteQueries.deleteTipById, [id], (transaction, result)=>{
         setSuccessDelete(true);  
      });
   });
}

const calculateTips = (array) => {
   return (array.length===0) ? 0 : array.map((tipObj)=>{return parseInt(tipObj.tip);})
               .reduce((acc, tip)=>{return acc + tip;});

}


export {createDatabase, createTipsTable, getTipsForSelectedPeriod, getArrayOfTipObj, insertTip, deleteTipById};