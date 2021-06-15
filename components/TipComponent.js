import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { eachWeekOfInterval,eachMonthOfInterval, isThisWeek, startOfWeek, lastDayOfWeek, lightFormat, isThisMonth, lastDayOfMonth, startOfMonth, startOfYear, lastDayOfYear } from 'date-fns'
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';
import TipItem from './TipItem';

import {createDatabase, getTipsForSelectedPeriod, getArrayOfTipObj, deleteTipById} from '../database/database.js';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { setStatusBarTranslucent } from 'expo-status-bar';



const Stack = createStackNavigator();


const TipComponent = ({navigation}) => {
    

    return (
      <Stack.Navigator screenOptions={{
        header: () =>(<Header navigation={navigation}/>),
    }}>
        <Stack.Screen name="Summary"  component={Summary} />
        <Stack.Screen name="Tips" component={Tips} />
      </Stack.Navigator>
    );
}

const Summary = ({navigation}) =>{
    const [periodType, setPeriodType] = useState(0);
    const [tips, setTips] = useState(0);
    const [tipsArray, setTipsArray] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); 
    const [currentIndex, setCurrIndex] = useState(0);
    const [summary, setSummary] = useState({});
    const [intervals, setIntervals] = useState([]);


    createDatabase();

    useEffect(()=>{
        getIntervals();
        getCurrentInterval();
        setPeriodDates();  
        showTipsList();
        calculateSummary();
    }, [])


    useEffect(()=>{
        getIntervals();
    }, [periodType]);

    useEffect(()=> {
        getCurrentInterval();
    }, [intervals])


    useEffect(()=>{
        setPeriodDates();
        
        //console.log(tipsArray)
        //console.log(startDate, endDate)
        // showTipsList();
        // calculateSummary();
    }, [currentIndex])

    useEffect(()=>{
        // showTipsList();
        // calculateSummary();
        //console.log("Hello", tipsArray)
    }, [startDate, endDate])
    useFocusEffect(
        React.useCallback(()=>{
            showTipsList()
            calculateSummary();
        return ()=>null;
        }, [tipsArray,])
       
    )



    const showTipsList = () => {
        //console.log(tipsArray)
        getArrayOfTipObj(periodType, setTipsArray, lightFormat(startDate, 'yyyy-MM-dd'), lightFormat(endDate, 'yyyy-MM-dd'));
    }



    const getIntervals = () =>{
        
        let current = new Date();
        let intvls = [];
        let options = {
            start: new Date(current.getFullYear(), 0, 1),
            end: new Date(current.getFullYear(), 11, 31)
        }
        if(periodType==0){
            intvls = eachWeekOfInterval(options);
        }
        else if(periodType==1){
            intvls = eachMonthOfInterval(options);
        }
        setIntervals(intvls);
    }

    

    const incrementIndex = () => {
        if(!(currentIndex>=intervals.length)){
            setCurrIndex(currentIndex+1);
        }
            
    }

    const decrementIndex = () => {
        if(!(currentIndex<=0)){
            setCurrIndex(currentIndex-1);
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
        })    
    }

    const setPeriodDates = () => {
        
        if(periodType===2){
            setStartDate(startOfYear(new Date()))
            setEndDate(lastDayOfYear(new Date()))
        }
        else if(periodType===0){
            setStartDate(startOfWeek(intervals[currentIndex]));
            setEndDate(lastDayOfWeek(intervals[currentIndex]));
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
    }



    const showTips = () => {
        navigation.navigate('Tips', {periodType: periodType, from: lightFormat(startDate, 'yyyy-MM-dd'), to: lightFormat(endDate, 'yyyy-MM-dd')});
        
    }
    

    return(
        <TouchableOpacity style={styles.container} onPress={showTips}>
            <ButtonGroup setTipDisplayMode={setPeriodType} />
            <TipAmount date={{startDate: startDate.toDateString(), endDate: endDate.toDateString()}} handlers={{incrementIndex:incrementIndex, decrementIndex:decrementIndex}} summary={summary}/>  
        </TouchableOpacity>
    )
}

const Tips = ({navigation, route}) => {
    
    const [tips, setTips] = useState([]);
    const[success, setSuccessDelete] = useState(false);
    const {periodType, from, to} = route.params;


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
            <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10,}} onPress={() => navigation.goBack(null)}>
                <Icon name="chevron-left" 
                size={35} color= '#4287f5'/>
                <Text style={{color:'#4287f5', paddingVertical: 9,}}>Back</Text>
            </TouchableOpacity>
            
                <FlatList 
                showsVerticalScrollIndicator ={false}
                ListEmptyComponent = {<View style={{alignItems:'center'}}><Text>No tips to display</Text></View>}
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
    }
})
export default TipComponent;