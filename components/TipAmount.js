import * as React from 'react'
import {Text, StyleSheet} from 'react-native';

const TipAmount = () =>{
    return (
        <Text style = {styles.tip}>Tip Amount</Text>
    )
}
const styles = StyleSheet.create({
    tip: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
})
export default TipAmount;