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
            <ListItem.Subtitle>Message: {item.tip.message}</ListItem.Subtitle>
            <ListItem.Subtitle>Date: {item.tip.date}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon Component={TouchableOpacity} name='delete-outline' color='grey' onPress={deleteItem}/>
    </ListItem>
    );
}


const styles = StyleSheet.create({
    container: {
        minWidth: '100%'
    }
})

export default TipItem;