import React, {useState, useEffect} from 'react';
import {Text, TextInput,StyleSheet, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button} from 'react-native-elements'
import {createDatabase, createTipsTable, insertTip} from '../database/database.js';


const HomeScreen = ({navigation}) => {      
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [tip, setTip] = useState('');
    const [message, setMessage] = useState('');
    const [hourlyWage, setHourlyWage] = useState('');
    const [hours, setHours] = useState('');
   


    createDatabase();
   

    useEffect(() => {
        createTipsTable();
    }, []);


    useEffect(()=>{
        console.log(tip)
    }, [tip])
    
    const setSaveStatusFlag = (flag) =>{
        alert(flag? "Tip Added!" : "Could not add tip");
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


    const onChangeWage = (wage) => {
        setHourlyWage(wage);
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


    const onChangeHours = (hours) => {
        setHours(hours);
    }

    const addTip = () => {
        if (inputIsValid()){
            const stringDate = buildDateString(date.getFullYear(), date.getMonth()+1, date.getDate());
            insertTip(tip, message, stringDate, hourlyWage, hours, setSaveStatusFlag);
            setTip('');
            setMessage('');
            setHours(''); 
        }
        else{
            alert('Some fields are empty')
        }
        

        
    }

    const inputIsValid = () =>{
        if(tip==='' || hours ==='' || hourlyWage ===''){
            return false;
        }
       return true;
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style = {styles.form}>
                    <Text style={styles.title}>Enter Your Tip</Text>
                    <View style = {styles.date}>
                        <Text style = {styles.currentDate}>{date.toDateString()}</Text>
                        <Text style = {styles.changeBtn} onPress = {showDatePicker}>change</Text>
                    </View>
                    <View>
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
                        onChangeText = {onChangeHours}
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
                    <View style={{flex: 1}}></View>
            </View>
            
        </KeyboardAvoidingView>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    form: {
        flex: 1,
        justifyContent: 'flex-end',
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
        fontSize: 25,
    },
    changeBtn:{
        color: '#adadad',
        fontStyle: 'italic',
        fontSize: 25,
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


