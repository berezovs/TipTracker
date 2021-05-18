import React, {useState, useEffect} from 'react';
import {Text, TextInput,StyleSheet, View, Button, StatusBar} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonGroup from './ButtonGroup';
import Header from './Header';
import TipAmount from './TipAmount'
import {openDatabase} from '../database/database.js';


const HomeScreen = ({navigation, screenOptions}) => {
    const db = openDatabase();
    console.log(screenOptions)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [tip, setTip] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        db.transaction((transaction)=>{
            transaction.executeSql("drop table tips;");
        })
        db.transaction((transaction)=>{
            transaction.executeSql("create table if NOT EXISTS tips (id integer primary key autoincrement, tip numeric NOT null, message text NOT null, date numeric NOT null);")
        })
    }, []);

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
       
      db.transaction(async (transaction)=>{
       await transaction.executeSql("insert into tips(tip, message, date) values(?, ?, ?);", [tip, message, date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()] ) 
       setTip('');
       setMessage('');
        
    });
    db.transaction(async (transaction)=>{
        await transaction.executeSql("select * from tips", [], (transaction, result)=>{
            for(let i = 0; i< result.rows.length; i++){
                console.log(result.rows.item(i))
            }
            
        }) 
         
     });
       
  }


    return (
      <View style = {styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup />
            <TipAmount />
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
                <Text style = {styles.currentDate}>{date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()}</Text>
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