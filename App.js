import 'react-native-gesture-handler';
import  React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'; 
import {Text, TextInput,StyleSheet, View} from 'react-native';
import TipComponent from './components/TipComponent.js';
import Home from './components/Homescreen.js';



const Drawer = createDrawerNavigator();

const DrawerContent = ({...props}) => {
  //console.log(props);
  return (
    <DrawerContentScrollView {...props}>
        <DrawerItem label="Home" onPress={()=> {props.navigation.navigate('Home')}}  style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}/>
        
        <DrawerItem label="Tip" onPress={()=> {props.navigation.navigate('Summary')}} style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}/>
    </DrawerContentScrollView>
   
  )
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props)=> <DrawerContent {...props} />} drawerType='slide' name="MyTipTracker" >
      <Drawer.Screen name="Home"  component={Home} />
      <Drawer.Screen name ="Summary" component={TipComponent} />
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;