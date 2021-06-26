import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {addWeeks, 
        addMonths, 
        addYears, 
        startOfWeek, 
        lastDayOfWeek, 
        lightFormat, 
        lastDayOfMonth, 
        startOfMonth, 
        startOfYear, 
        lastDayOfYear} from 'date-fns'
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
    const PERIOD_TYPES = {
        WEEK: 0,
        MONTH: 1,
        YEAR: 2,
    }

    const[periodType, setPeriodType] = useState(PERIOD_TYPES.WEEK);
    const[currentPeriod, setCurrentPeriod] = useState(new Date());
    const[periodDates, setPeriodDates] = useState({startDate: new Date(), endDate: new Date()});
    const[offset, setOffset] = useState(0);
    const[tips, setTips] = useState([]);


    useEffect(()=>{
        //setStart and endDates,
        setDates();
        //calculate summary details
    }, []);

    useEffect(()=>{
        //setStart and endDates
        setOffset(0);
        setDates();
        //calculate summary details
    }, [periodType]);


    useEffect(()=>{
    }, [periodDates])


    useEffect(()=>{
        setDates();
    }, [currentPeriod]);

    useEffect(()=>{
        //when the offset changes update the date to the next or the previous one
        changePeriod();
        //calculate summary details
    }, [offset])

    const changePeriod = () => {
        if(periodType===PERIOD_TYPES.WEEK){
            setCurrentPeriod(addWeeks(new Date(), offset))
        }
        else if(periodType===PERIOD_TYPES.MONTH){
            setCurrentPeriod(addMonths(new Date(), offset))
        }else if(periodType===PERIOD_TYPES.YEAR){
            setCurrentPeriod(addYears(new Date(), offset))
        }
    }

    const setDates = () => {
        if(periodType===PERIOD_TYPES.WEEK){
            setPeriodDates({startDate: startOfWeek(currentPeriod, {weekStartsOn: 1}),
                            endDate: lastDayOfWeek(currentPeriod, {weekStartsOn: 1})});
            //console.log(PERIOD_TYPES.WEEK)
        }
        else if(periodType===PERIOD_TYPES.MONTH){
            setPeriodDates({startDate: startOfMonth(currentPeriod),
                            endDate: lastDayOfMonth(currentPeriod)});
            //console.log(PERIOD_TYPES.MONTH)
        }
        else if(periodType===PERIOD_TYPES.YEAR){
            setPeriodDates({startDate: startOfYear(currentPeriod),
                endDate: lastDayOfYear(currentPeriod)});
            //console.log(PERIOD_TYPES.YEAR)
        }
    }


    const incrementOffset = () => {
        setOffset(offset+1);
    }

    const decrementOffset = () => {
        setOffset(offset-1);
    }
    // const calculateSummary = ()=> {
    //     let totalEarnings = 0;
    //     let totalHoursWorked = 0;
    //     let hourlyEarnings = 0;

    //     if(tipsArray.length!=0){
    //         tipsArray.forEach((tipObj)=>{
    //             totalHoursWorked+=parseFloat(tipObj.hours);
    //             totalEarnings=totalEarnings+parseFloat(tipObj.tip)+(parseFloat(tipObj.wage)*parseFloat(tipObj.hours));

    //         });
    //     }
    //     if(!totalHoursWorked==0){
    //         hourlyEarnings = totalEarnings/totalHoursWorked;
    //     }
       
    //     setSummary({
    //         earnings:totalEarnings.toString(),
    //         hoursWorked: totalHoursWorked.toString(),
    //         hourlyEarnings: hourlyEarnings
    //         .toString()
    //         .split('.')
    //         .map((value, index)=>(index==1) ? value.substr(0,2) : value)
    //         .join('.'),
    //     })    
    // }

    // const setPeriodDates = () => {
        
    //     if(periodType===2){
    //         setStartDate(startOfYear(new Date()))
    //         setEndDate(lastDayOfYear(new Date()))
    //     }
    //     else if(periodType===0){
    //         setStartDate(startOfWeek(intervals[currentIndex], {weekStartsOn: 1}));
    //         setEndDate(lastDayOfWeek(intervals[currentIndex], {weekStartsOn: 1}));
    //     }
    //     else if(periodType===1){
    //         setStartDate(startOfMonth(intervals[currentIndex]));
    //         setEndDate(lastDayOfMonth(intervals[currentIndex]));
    //     }
    // }

    // const getCurrentInterval = () => {
    //     if(periodType==0){
    //         for(let i=0; i<intervals.length; ++i){
    //             if(isThisWeek(intervals[i])) {
    //                 setCurrIndex(i);
    //                 return;
    //             }
    //         }
    //     }
    //     else if(periodType==1){
            
    //         for(let i=0; i<intervals.length; ++i){
    //             if(isThisMonth(intervals[i])){
    //                 setCurrIndex(i);
    //                 return;
    //             }
    //         }
    //     }
    //     else if(periodType==2){
    //         setCurrIndex(0);
    //     }
    // }



    const showTips = () => {
        // navigation.navigate('Tips', {periodType: periodType, 
        //     from: lightFormat(startDate, 'yyyy-MM-dd'), 
        //     to: lightFormat(endDate, 'yyyy-MM-dd'), 
        //     dateString: {startDateString: startDate.toDateString(), endDateString: endDate.toDateString() }
        // });
        
    }
    

    return(
        <TouchableOpacity style={styles.container} onPress={showTips}>
            <ButtonGroup setPeriodType={setPeriodType} />
            <TipAmount 
            date={{startDate: periodDates.startDate.toDateString(), endDate: periodDates.endDate.toDateString()}} 
            handlers={{incrementIndex:incrementOffset, decrementIndex:decrementOffset}} 
            summary={null} />  
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
    },
    titleContainer:{
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'grey',

    }
})
export default TipComponent;