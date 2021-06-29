import * as SQLite from 'expo-sqlite';


let db = null;

const createDatabase = () => {
        db = SQLite.openDatabase("db.db");
//    console.log(db)
}

const createTipsTable = () =>{
   //  db.transaction((transaction)=>{
   //     transaction.executeSql("drop table tips");
   //  })
   db.transaction((transaction)=>{

      transaction.executeSql("create table if NOT EXISTS tips (id integer primary key autoincrement, tip text not null, message text, date text NOT null, week text NOT NULL, wage text NOT null, hours text NOT null);", (transaction, result)=>{
      });
  })
}

const queries = {
   selectQueries : { 
   0: "select id, tip, message, date, wage, hours, week from tips where date >= ? and date <= ?",
   1: "select id, tip, message, date, wage, hours from tips where strftime('%m', date)=strftime('%m', 'now')",
   2: "select id, tip, message, date, wage, hours from tips where strftime('%Y', date)=strftime('%Y', 'now')",
},
   insertQueries: {insertTip: "insert into tips(tip, message, date, week, wage, hours) values(?, ?, ?, strftime('%W', ?), ?, ?);"},
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

const insertTip = (tip, message, stringDate, wage, hours, callback) => {
   db.transaction(async (transaction)=>{
      await transaction.executeSql(queries.insertQueries.insertTip, [tip, message, stringDate, stringDate, wage, hours], (_, rs)=>{callback(true)}, (_, err)=>{callback(false), console.log("Hello")}) 
      }); 
}

const getArrayOfTipObj = (mode, setTipsArray, from, to) =>{
   //console.log(from, to)
   db.transaction((transaction)=>{
      transaction.executeSql(queries.selectQueries[0], [from ,to], (_,{rows:{_array}})=>{
         //console.log(_array)
         setTipsArray(_array);
      }, (_, err)=>{console.log(err)});
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