import  React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { ButtonGroup } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';


const Buttons = ({navigation, setPeriodType})=>{
    const options = ["Week", "Month", "Year"];
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(()=>{
        setPeriodType(selectedIndex);
    }, [selectedIndex])
    return (
        <ButtonGroup
            buttons={options}
            containerStyle={{ width : 350, height: 30}}
            disabledStyle={{}}
            disabledTextStyle={{}}
            disabledSelectedStyle={{}}
            disabledSelectedTextStyle={{}}
            innerBorderStyle={{}}
            selectedIndex = {selectedIndex}
            onPress = {index => {setSelectedIndex(index)}}
            selectedTextStyle={{}}
            textStyle={{}}
    />
    )
}

const styles  = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
    },
    btn: {
        padding: 10,
    }
})
export default Buttons;