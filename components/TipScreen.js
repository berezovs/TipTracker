import * as React from'react'
import {View, Text, StyleSheet} from 'react-native';
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';
import {openDatabase} from '../database/database.js';


const TipScreen = ({navigation}) =>{


    return(
        <View style={styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup />
            <TipAmount />
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        alignItems: "center",
    }
})
export default TipScreen;