import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const HeaderComponent = ({children}) =>{
  
  return(
    <View style={styles.container}>
      <Text style={styles.logo}>MyTipTracker</Text >
      <Text style={styles.screenName}>{children}</Text>
    </View>
  )}

    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
      logo: {
        color: '#fff',
        fontSize: 24,

      },
       screenName: {
         color: '#fff',
         fontSize: 16,
       }
    });
  export default HeaderComponent;