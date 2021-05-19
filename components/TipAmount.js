import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native';

const TipAmount = ({tips}) =>{
    return (
        <View>
            <Text style = {styles.header}>Tip Amount</Text>
            <Text style = {styles.tip}>{tips}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    tip: {
        textAlign: 'center',
    }
})
export default TipAmount;