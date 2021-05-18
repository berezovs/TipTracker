import 'react-native-gesture-handler';
import  React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer'; 
import TipScreen from './components/TipScreen';
import HomeScreen from './components/Homescreen.js'



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerType='slide' >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name ="Tips" component={TipScreen} />
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