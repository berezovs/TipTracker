import React, {useState, useEffect} from 'react';
import {Text, TextInput,StyleSheet, View, Button, StatusBar} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonGroup from './ButtonGroup';
import Header from './Header';
import TipAmount from './TipAmount'
import {openDatabase} from '../database/database.js';


const HomeScreen = ({navigation}) => {      
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [tip, setTip] = useState('');
    const [message, setMessage] = useState('');
    const [tipMode, setTipMode] = useState(0);
    const [tips, setTips] = useState(0);

    const db = openDatabase();
   

    useEffect(() => {
        db.transaction((transaction)=>{
            transaction.executeSql("create table if NOT EXISTS tips (id integer primary key autoincrement, tip text NOT null, message text NOT null, date text NOT null, week text NOT NULL);")
        })

        getTipsForSelectedPeriod(tipMode);
    }, []);


    useEffect(() => {
        getTipsForSelectedPeriod(tipMode)
    }, [tipMode]);


    const getTipsForSelectedPeriod = (mode) =>{
        switch(tipMode){
            case 0:
                getWeeklyTips();
                break;
            case 1:
                getMonthlyTips();
                break;
            case 2:
                getYearlyTips();
                break;
            default:
                console.error("unknown");
        }
    }

    const buildDateString = (year, month, day) =>{
        let dateString = '';
        dateString+=year.toString();
        dateString+='-';
        if (month<=9){
          dateString+='0';
          dateString+=month.toString();
        }else{
          dateString+=month.toString();
        }
      
        dateString+='-'
      
        if (day<=9){
          dateString+='0';
          dateString+=day.toString();
        }else{
          dateString+=day.toString();
        }
        return dateString;
      } 



    const getWeeklyTips = () =>{
        db.transaction((transaction)=>{
            transaction.executeSql("select tip, date from tips where strftime('%W', date)=strftime('%W', 'now')", [], (transaction, result)=>{
                let accumulator = 0
                for(let i=0; i<result.rows.length; i++){
                    accumulator+=parseInt(result.rows.item(i).tip);
               }
               setTips(accumulator);
            });
        })
    }

    const getMonthlyTips = () => {
        db.transaction((transaction)=>{
            transaction.executeSql("select tip, date from tips where strftime('%m', date)=strftime('%m', 'now')", [], (transaction, result)=>{
                let accumulator = 0
                for(let i=0; i<result.rows.length; i++){
                    accumulator+=parseInt(result.rows.item(i).tip);
               }
               setTips(accumulator);
            });
        });
    }

    const getYearlyTips = () => {
        db.transaction((transaction)=>{
            transaction.executeSql("select tip, date from tips where strftime('%Y', date)=strftime('%Y', 'now')", [], (transaction, result)=>{
                let accumulator = 0
                for(let i=0; i<result.rows.length; i++){
                    accumulator+=parseInt(result.rows.item(i).tip);
               }
               setTips(accumulator);
            });
        });
    }

    const setTipDisplayMode = (mode) => {
        setTipMode(mode);
    }

        const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const onChangeMessage = (text) => {
        setMessage(text);
    }

    const onChangeTip = (tip) => {
        setTip(tip);
    }

    const addTip = () => {
        const stringDate = buildDateString(date.getFullYear(), date.getMonth()+1, date.getDate());
        db.transaction(async (transaction)=>{
        await transaction.executeSql("insert into tips(tip, message, date, week) values(?, ?, ?,  strftime('%W', ?));", [tip, message, stringDate, stringDate ] ) 
        setTip('');
        setMessage('');
        getTipsForSelectedPeriod(tipMode);
        });     
    }


    return (
      <View style = {styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup setTipDisplayMode={setTipDisplayMode}/>
            <TipAmount tips={tips}/>
            <TextInput 
                style = {styles.input}
                value = {tip}
                keyboardType = 'numeric'
                placeholder = 'enter a tip'
                onChangeText = {onChangeTip}
            />
            <TextInput 
                style = {styles.input}
                value = {message}
                keyboardType = 'default'
                placeholder = 'enter a message'
                onChangeText = {onChangeMessage}
            />
            <View style = {styles.date}>
                <Text style = {styles.currentDate}>{(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()}</Text>
                <Text style = {styles.changeBtn} onPress = {showDatePicker}>change</Text>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Button title="Add tip"  onPress={addTip} />
            <Button title = "Undo" />
                
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    
    input: {
        padding: 5,
        marginTop: 20,
        width: 300,
        borderBottomWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 5,
        
    },

    date: {
        flexDirection: "row",
        padding: 5,
        marginTop: 20,
        width: 300,
        borderBottomWidth: 1,
        borderColor: 'lightblue',
        justifyContent: "space-between",
    },
    currentDate: {
        color: '#adadad'
    },
    changeBtn:{
        color: '#adadad',
        fontStyle: 'italic',
    }
 
})

export default HomeScreen;