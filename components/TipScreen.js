import React, {useEffect, useState} from'react'
import {View, Text, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';
import TipItem from './TipItem';

import {createDatabase, getTipsForSelectedPeriod, getArrayOfTipObj} from '../database/database.js';



const TipScreen = ({navigation}) =>{
    const [tipMode, setTipMode] = useState(0);
    const [tips, setTips] = useState(0);
    const [tipsArray, setTipsArray] = useState([]);

    createDatabase();
    useEffect(()=>{
        showTips();
        showTipsList();
    }, [tipMode]);

    useEffect(()=>{
        showTips();
        showTipsList();
    }, [tips]);


    useFocusEffect(
        React.useCallback(()=>{
            showTips();
            showTipsList()
        return ()=>null;
        }, [tips])
       
    )



    const setTipDisplayMode = (mode) => {
        setTipMode(mode);
    }

    const showTips = () =>{
        getTipsForSelectedPeriod(tipMode, setTips);
    }

    const showTipsList = async() => {
        await getArrayOfTipObj(tipMode, setTipsArray);
        console.log(tipsArray);
    }


    return(
        <View style={styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup setTipDisplayMode={setTipDisplayMode} />
            <TipAmount tips={tips}/>
            <TipList tipsArray={tipsArray}/>
        </View>
    )
}

const TipList = ({tipsArray}) => {
    if(tipsArray.length==0){
        return <Text>No tips to display</Text>
    }

    else{
        return <View>
        {      
            tipsArray.map((item, index)=>(
                <TipItem item ={{tip:item}}/>
            ))
        }
    </View>
    }
}


const styles = StyleSheet.create({
    container : {
        alignItems: "center",
    }
})
export default TipScreen;