import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';


const TipItem = ({item}) => {

    const deleteItem = () =>{
        item.delete(item.tip.id);
    }

    return(
    <ListItem bottomDivider style={styles.container}>
        <ListItem.Content>
            <ListItem.Title>Tip: {item.tip.tip}</ListItem.Title>
            <ListItem.Subtitle>Message: {item.tip.id}</ListItem.Subtitle>
            <ListItem.Subtitle>Date: {item.tip.date}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon Component={TouchableOpacity} name='delete-outline' color='grey' onPress={deleteItem} style={styles.delete}/>
    </ListItem>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 350,
    },
    delete :{
        color: 'green'
    }
})

export default TipItem;