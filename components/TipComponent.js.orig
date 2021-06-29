import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { eachWeekOfInterval,eachMonthOfInterval, eachYearOfInterval, isThisWeek, startOfWeek, lastDayOfWeek, lightFormat, isThisMonth, lastDayOfMonth, startOfMonth, startOfYear, lastDayOfYear, setYear} from 'date-fns'
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';
import TipItem from './TipItem';

import {createDatabase, getTipsForSelectedPeriod, getArrayOfTipObj, deleteTipById} from '../database/database.js';




const Stack = createStackNavigator();


const TipComponent = ({navigation}) => {
    

    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4287f5',
        },
        headerTitle: ({children})=><Header children={children}/>,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen name="Summary"  component={Summary} />
        <Stack.Screen name="Tips" component={Tips} />
      </Stack.Navigator>
    );
}

const Summary = ({navigation}) =>{
    const [periodType, setPeriodType] = useState(0);
    const [tipsArray, setTipsArray] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); 
    const [currentIndex, setCurrIndex] = useState(0);
    const [summary, setSummary] = useState({});
    const [intervals, setIntervals] = useState([]);
    const [yearOffset, setYearOffset] = useState(0);


    createDatabase();

    useEffect(()=>{
        getIntervals();
        getCurrentInterval();
        setPeriodDates();  
        showTipsList();
        calculateSummary();
    }, [])


    useEffect(()=>{
        setYearOffset(0);
        getIntervals();
    }, [periodType]);

    useEffect(()=>{
        getIntervals();
    }, [yearOffset])

    useEffect(()=> {
        setPeriodDates();
    }, [intervals])


    useEffect(()=>{
        setPeriodDates();
    }, [currentIndex])

   

    useFocusEffect(
        React.useCallback(()=>{
            showTipsList()
            calculateSummary();
        return ()=>null;
        }, [tipsArray])
       
    )



    const showTipsList = () => {
        getArrayOfTipObj(periodType, setTipsArray, lightFormat(startDate, 'yyyy-MM-dd'), lightFormat(endDate, 'yyyy-MM-dd'));
    }



    const getIntervals = () =>{
        
        let current = new Date();
        let intvls = [];
        let options = {
            start: new Date((parseInt(current.getFullYear())+yearOffset).toString(), 0, 1),
            end: new Date((parseInt(current.getFullYear())+yearOffset).toString(), 11, 31)
        }
        if(periodType==0){
            intvls = eachWeekOfInterval(options, {weekStartsOn: 1});
        }
        else if(periodType==1){
            intvls = eachMonthOfInterval(options);
        }
        else if(periodType==2){
            intvls = eachYearOfInterval(options)
        }
        setIntervals(intvls);
        if(yearOffset<0){
            setCurrIndex(intervals.length-1);
        }else{
            setCurrIndex(0);
        }
    }

    

    const incrementIndex = () => {
        if(periodType==0 || periodType==1){
            if(!(currentIndex>=intervals.length-1)){
                setCurrIndex(currentIndex+1);
            }else{
                setYearOffset(yearOffset+1);
            }
        }
        else if(periodType==2){
            setYearOffset(yearOffset+1);
        }
        
    }

    const decrementIndex = () => {
        if(periodType==0||periodType==1){
            if(!(currentIndex<=0)){
                setCurrIndex(currentIndex-1);
            }
            else{
                setYearOffset(yearOffset-1);
            }   
        }else if(periodType==2){
            setYearOffset(yearOffset-1);
        }
    }


    const calculateSummary = ()=> {
        let totalEarnings = 0;
        let totalHoursWorked = 0;
        let hourlyEarnings = 0;

        if(tipsArray.length!=0){
            tipsArray.forEach((tipObj)=>{
                totalHoursWorked+=parseFloat(tipObj.hours);
                totalEarnings=totalEarnings+parseFloat(tipObj.tip)+(parseFloat(tipObj.wage)*parseFloat(tipObj.hours));

            });
        }
        if(!totalHoursWorked==0){
            hourlyEarnings = totalEarnings/totalHoursWorked;
        }
       
        setSummary({
            earnings:totalEarnings.toString(),
            hoursWorked: totalHoursWorked.toString(),
            hourlyEarnings: hourlyEarnings
            .toString()
            .split('.')
            .map((value, index)=>(index==1) ? value.substr(0,2) : value)
            .join('.'),
        });    
    }

    const setPeriodDates = () => {
        
        if(periodType===2){
            setStartDate(startOfYear(intervals[currentIndex]));
            setEndDate(lastDayOfYear(intervals[currentIndex]));
        }
        else if(periodType===0){
            setStartDate(startOfWeek(intervals[currentIndex], {weekStartsOn: 1}));
            setEndDate(lastDayOfWeek(intervals[currentIndex], {weekStartsOn: 1}));
        }
        else if(periodType===1){
            setStartDate(startOfMonth(intervals[currentIndex]));
            setEndDate(lastDayOfMonth(intervals[currentIndex]));
        }
    }

    const getCurrentInterval = () => {
        if(periodType==0){
            for(let i=0; i<intervals.length; ++i){
                if(isThisWeek(intervals[i])) {
                    setCurrIndex(i);
                    return;
                }
            }
        }
        else if(periodType==1){
            
            for(let i=0; i<intervals.length; ++i){
                if(isThisMonth(intervals[i])){
                    setCurrIndex(i);
                    return;
                }
            }
        }
        else if(periodType==2){
            setCurrIndex(0);
        }
    }



    const showTips = () => {
        navigation.navigate('Tips', {periodType: periodType, 
            from: lightFormat(startDate, 'yyyy-MM-dd'), 
            to: lightFormat(endDate, 'yyyy-MM-dd'), 
            dateString: {startDateString: startDate.toDateString(), endDateString: endDate.toDateString() }
        });
        
    }
    

    return(
        <TouchableOpacity style={styles.container} onPress={showTips}>
            <ButtonGroup setTipDisplayMode={setPeriodType} />
            <TipAmount date={{startDate: startDate.toDateString(), endDate: endDate.toDateString()}} handlers={{incrementIndex:incrementIndex, decrementIndex:decrementIndex}} summary={summary} />  
        </TouchableOpacity>
    )
}

const Tips = ({navigation, route}) => {
    
    const [tips, setTips] = useState([]);
    const[success, setSuccessDelete] = useState(false);
    const {periodType, from, to, dateString} = route.params;
    


    useEffect(()=>{
        getArrayOfTipObj(periodType, setTips, from, to);
    }, [])

    useEffect(()=> {
        getArrayOfTipObj(periodType, setTips, from, to);
    }, [success])

    useFocusEffect(
        React.useCallback(()=>{
            getArrayOfTipObj(periodType, setTips, from, to);
        return ()=>null;
        },[])
       
    )


    const deleteTip = (id) =>{
        deleteTipById(id, setSuccessDelete);
        getArrayOfTipObj(periodType, setTips, from, to);
    }



        return(
            <View style = {{flex: 1, }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Summary for {dateString.startDateString}</Text>
                    <Text style={styles.title}>to {dateString.endDateString}</Text>
                </View>
                <FlatList 
                showsVerticalScrollIndicator ={false}
                ListEmptyComponent = {<View style={{alignItems:'center', marginTop: 10}}><Text style={{fontSize: 16}}>No tips to display</Text></View>}
                showsHorizontalScrollIndicator={false}
                keyExtractor = {(item, index)=>index.toString()}
                data = {tips}
                renderItem = {({item})=>(<TipItem item ={{tip:item, delete: deleteTip}}
                />)} 
                /> 
            </View> 
        
        )
    }



const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    titleContainer:{
        marginTop: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'grey',

    }
})
export default TipComponent;