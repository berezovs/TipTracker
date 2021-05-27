import React, {useState, useEffect} from 'react';
import {Text, TextInput,StyleSheet, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button} from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import {dateFormatter} from '../utils/dateFormatter.js'
import {createDatabase, createTipsTable, getTipsForSelectedPeriod, insertTip} from '../database/database.js';


const HomeScreen = ({navigation}) => {      
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [tip, setTip] = useState('');
    const [message, setMessage] = useState('');
    const [hourlyWage, setHourlyWage] = useState('');
    const [hours, setHours] = useState('');
    const [tipMode, setTipMode] = useState(0);
    const [tips, setTips] = useState(0);

    createDatabase();
   

    useEffect(() => {
        createTipsTable();
        showTips();
    }, []);


    useEffect(() => {
        showTips();
    }, [tipMode, tips]);

    useFocusEffect(()=>{
        dateFormatter(date.toDateString());
        showTips();
    });
   

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


    const onChangeWage = (wage) => {
        setHourlyWage(wage);
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


    const onChangehours = (hours) => {
        setHours(hours);
    }

    const addTip = () => {
        const stringDate = buildDateString(date.getFullYear(), date.getMonth()+1, date.getDate());
        insertTip(tip, message, stringDate);
        setTip('');
        setMessage('');
        showTips();  
    }

    const showTips = () =>{
        getTipsForSelectedPeriod(tipMode, setTips);  
    }

    return (
        <View style={styles.container}>
            <View style = {styles.form}>
                    <Header navigation = {navigation}/>
                    <Text style={styles.title}>Enter Your Tip</Text>
                    <View style = {styles.date}>
                        <Text style = {styles.currentDate}>{date.toDateString()}</Text>
                        <Text style = {styles.changeBtn} onPress = {showDatePicker}>change</Text>
                    </View>
                    <TextInput 
                        style = {styles.input}
                        value = {tip}
                        keyboardType = 'numeric'
                        returnKeyType="done"
                        placeholder = 'enter a tip'
                        onChangeText = {onChangeTip}
                    />
                    <TextInput 
                        style = {styles.input}
                        value = {hourlyWage}
                        keyboardType = 'numeric'
                        returnKeyType="done"
                        placeholder = 'enter hourly wage'
                        onChangeText = {onChangeWage}
                    />
                    <TextInput 
                        style = {styles.input}
                        value = {hours}
                        keyboardType = 'numeric'
                        returnKeyType="done"
                        placeholder = 'enter hours worked'
                        onChangeText = {onChangehours}
                    />
                    <TextInput 
                        style = {styles.input}
                        value = {message}
                        keyboardType = 'default'
                        returnKeyType="done"
                        placeholder = 'add a note(optional)'
                        onChangeText = {onChangeMessage}
                    />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Button title="Add tip"  onPress={addTip} buttonStyle={styles.addTip}/> 
                    
            </View>
            <View style={styles.buttonContainer}>
                
            </View>
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 2,
        alignItems: 'center',
    },
    title: {
        marginTop: 10,
        fontSize: 20,
    },
    
    input: {
        padding: 20,
        marginTop: 20,
        width: 300,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        
    },

    date: {
        flexDirection: "row",
        padding: 5,
        marginTop: 30,
        width: 300,
        justifyContent: "space-between",
    },
    currentDate: {
        color: '#adadad',
        fontSize: 20,
    },
    changeBtn:{
        color: '#adadad',
        fontStyle: 'italic',
        fontSize: 20,
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
    },

    addTip :{
        marginTop: 20,
        paddingHorizontal: 123,
        paddingVertical: 20,
        
    }
 
})

export default HomeScreen;


