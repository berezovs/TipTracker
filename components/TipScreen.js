import React, {useState} from'react'
import {View, Text, StyleSheet} from 'react-native';
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';
import {openDatabase} from '../database/database.js';


const TipScreen = ({navigation}) =>{
    const [tipMode, setTipMode] = useState(0);

    const setTipDisplayMode = (mode) => {
        setTipMode(mode);
    }

    return(
        <View style={styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup setTipDisplayMode={setTipDisplayMode} />
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