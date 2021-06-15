import 'react-native-gesture-handler';
import  React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'; 
import {Text} from 'react-native';
import {Icon} from 'react-native-elements'
import TipComponent from './components/TipComponent.js';
import Home from './components/Homescreen.js';



const Drawer = createDrawerNavigator();

const DrawerContent = ({...props}) => {
  //console.log(props);
  return (
    
    <DrawerContentScrollView {...props}>
        <DrawerItem label={() => <Text style={{fontSize: 24, }}>{'MyTipTracker'}</Text>} onPress={()=>{}} />
        <DrawerItem label="Home"
         onPress={()=> {props.navigation.navigate('Home')}}  style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}
         icon={({focused, color, size})=>{ <Icon color={'red'} size={0} name='menu' />}}/>
        
        <DrawerItem label="Summary" onPress={()=> {props.navigation.navigate('Summary')}} style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}/>
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
      <DrawerNavigator style={{activeBackgroundColor: '#4287f5'}}/>
    </NavigationContainer>
  );
};

export default App;