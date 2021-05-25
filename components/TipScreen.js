import React, {useEffect, useState} from'react'
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import TipAmount from './TipAmount';
import ButtonGroup from './ButtonGroup';
import TipItem from './TipItem';

import {createDatabase, getTipsForSelectedPeriod, getArrayOfTipObj, deleteTipById} from '../database/database.js';



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
    }, [tips, tipsArray]);


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

    const showTipsList = () => {
        getArrayOfTipObj(tipMode, setTipsArray);
        
    }

    return(
        <View style={styles.container}>
            <Header navigation = {navigation}/>
            <ButtonGroup setTipDisplayMode={setTipDisplayMode} />
            <TipAmount tips={tips}/>
            <TipList tipsArray={tipsArray} refreshList ={showTips}/>
        </View>
    )
}

const TipList = ({tipsArray, refreshList}) => {
    const[successDelete, setSuccessDelete] = useState(false);

    const deleteTip = (id) =>{
        deleteTipById(id, setSuccessDelete);
        
    }


    useEffect(()=>{
        refreshList();
        setSuccessDelete(false);
    }, [successDelete]);


    if(tipsArray.length==0){
        return <Text>No tips to display</Text>
    }

    else{
        return(
            <View style = {{flex: 1}}>
                <FlatList 
                keyExtractor = {(item, index)=>index.toString()}
                data = {tipsArray}
                renderItem = {({item})=>(<TipItem item ={{tip:item, delete: deleteTip}}
                showsVerticalScrollIndicator ={false}
                />)} 
                /> 
            </View> 
        
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
    }
})
export default TipScreen;