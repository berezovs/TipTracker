import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Modal, View, Text} from 'react-native';
import {ListItem, Icon, Overlay, Button} from 'react-native-elements';



const TipItem = ({item}) => {
    const[modalVisible, setModalVisible] = useState(false);
    const deleteItem = () =>{
        toggleConfirmationDialog();
        item.delete(item.tip.id);
    }

    const toggleConfirmationDialog = () =>{
        setModalVisible(!modalVisible);
    }

    return(
    <View>
        <Overlay overlayStyle={styles.modalView} isVisible={modalVisible} animationType='fade'>
            <View style={styles.modalTextContainer}>
                <Text style={styles.modalText}>Tip: {item.tip.tip}</Text>
                <Text style={styles.modalText}>Date: {item.tip.date}</Text>
            </View>
            <View style={styles.modalButtonContainer}>
                <Button title="Delete"  buttonStyle={styles.modalButton} onPress={deleteItem}/>
                <Button title="Cancel" type ='outline' buttonStyle={styles.modalButton} onPress={toggleConfirmationDialog}/>
            </View>
        </Overlay>
        <ListItem bottomDivider style={styles.container}>
            <ListItem.Content>
                <ListItem.Title>Tip: {item.tip.tip}</ListItem.Title>
                <ListItem.Subtitle>Message: {item.tip.message}</ListItem.Subtitle>
                <ListItem.Subtitle>Date: {item.tip.date}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon Component={TouchableOpacity} name='delete-outline' color='grey' onPress={toggleConfirmationDialog}/>
        </ListItem>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '100%'
    },
    
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
    }, 
    modalButtonContainer: {
        minWidth: '90%'
    }, 
    modalButton: {
        padding: 10,
        margin: 5,
    }, 
    modalTextContainer: {
        padding: 10,
    },
    modalText : {
        padding: 2,
        fontSize: 16,
    }
})

export default TipItem;