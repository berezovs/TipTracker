import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';


const TipItem = ({item}) => {
    return(
    <ListItem key = {item.tip.id} bottomDivider style={styles.container}>
        <ListItem.Content>
            <ListItem.Title>Tip: {item.tip.tip}</ListItem.Title>
            <ListItem.Subtitle>Message: {item.tip.message}</ListItem.Subtitle>
            <ListItem.Subtitle>Date: {item.tip.date}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 400,
    }
})

export default TipItem;