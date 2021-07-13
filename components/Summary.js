import React, {useState, useEffect}  from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const TipAmount = ({date, handlers, summary}) =>{

    const options = ['overview', 'details'];
   
   const[start, setStart] = useState(date.startDate);
   const[end, setEnd] = useState(date.endDate);
   const[sum, setSummary] = useState(summary);
   const [selectedIndex, setSelectedIndex] = useState(0);
    
    useEffect(()=>{
        setStart(date.startDate);
        setEnd(date.endDate);
        setSummary(summary);
    }, [date, summary]);
   
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
                <View style={styles.section}>
                    <Text style={styles.text}>Week: {start}-{end}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Total earnings:</Text>
                    <Text style={styles.text}>${sum.earnings}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Hourly earnings:</Text>
                    <Text style={styles.text}>${sum.hourlyEarnings}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Total hours worked:</Text>
                    <Text style={styles.text}>${sum.hoursWorked}</Text>
                </View>
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
        alignItems:'center',

    },
    summaryContent: {
        minWidth: '90%',
        justifyContent: 'flex-start'
    },
    header: {
        fontSize: 20,
        padding: 10,
    },
    section: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    text: {
       fontSize: 20,
       color:'grey',
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