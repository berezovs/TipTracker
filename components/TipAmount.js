import React, {useState, useEffect}  from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import { eachWeekOfInterval, getISOWeek, endOfWeek, startOfWeek, lastDayOfWeek } from 'date-fns'

const TipAmount = ({date, handlers, summary}) =>{
   
   const[start, setStart] = useState(date.startDate)
   const[end, setEnd] = useState(date.endDate)
   const[sum, setSummary] = useState(summary)
    
    useEffect(()=>{
        setStart(date.startDate);
        setEnd(date.endDate);
        setSummary(summary);
    }, [date, summary])
   
    const getPrevious = () => {
       handlers.decrementIndex();
    }

    const getNext = () => {
       handlers.incrementIndex();
    }


    return (
        <View style={styles.container}>
            <Text style = {styles.header}>Summary</Text>
            <View style={styles.summaryContent}>
            <Text style={styles.text}>Week: {start}-{end}</Text>
            <Text style={styles.text}>Total earnings: {sum.earnings}</Text>
            <Text style={styles.text}>Total hours worked: {sum.hoursWorked}</Text>
            <Text style={styles.text}>Hourly earnings: {sum.hourlyEarnings}</Text>
            </View>
            <View style={styles.buttons}>
                <Icon name='chevron-left' size={50} color='#4287f5' onPress={getPrevious}/>
                <View style={styles.space}></View>
                <Icon name='chevron-right' size={50} color='#4287f5' onPress={getNext}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    summaryContent: {
        minWidth: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    header: {
        fontSize: 20,
        padding: 10,
    },
    text: {
       fontSize: 16,
       marginBottom: 5,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        
    },
    space: {
        paddingHorizontal: 120
    }
    
})
export default TipAmount;