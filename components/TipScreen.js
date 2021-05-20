import React, {useEffect, useState} from'react'
import {View, Text, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';

import {createDatabase, getTipsForSelectedPeriod} from '../database/database.js';



const TipScreen = ({navigation}) =>{
    const [tipMode, setTipMode] = useState(0);
    const [tips, setTips] = useState(0);

    createDatabase();
    useEffect(()=>{
        showTips();
    }, [tipMode]);

    useEffect(()=>{
        showTips();
    }, []);


    useFocusEffect(()=>{
        showTips();
    })

    const setTipDisplayMode = (mode) => {
        setTipMode(mode);
    }

    const showTips = () =>{
        getTipsForSelectedPeriod(tipMode, setTips);
    }


    return(
        <View style={styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup setTipDisplayMode={setTipDisplayMode} />
            <TipAmount tips={tips}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        alignItems: "center",
    }
})
export default TipScreen;