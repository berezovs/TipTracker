import 'react-native-gesture-handler';
import  React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'; 
import {Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TipComponent from './components/TipComponent.js';
import Home from './components/Homescreen.js';



const Drawer = createDrawerNavigator();
 

const DrawerContent = ({...props}) => {
  const[isHomeActive, setHomeToActive] = useState(true);
  const[isSummaryActive, setSummaryActive] = useState(false);
  const[isChartsActive, setChartsToActive] = useState(false);

  
  //console.log(props);
  return (
    
    <DrawerContentScrollView {...props}>
        <DrawerItem label={() => <Text style={{fontSize: 24, }}>{'MyTipTracker'}</Text>} onPress={()=>{}} />
        <DrawerItem 
        label="Home"
        focused={isHomeActive}
        icon={({focused, color, size})=> <AntDesign color={color} size={size} name={'home'}/>}
         onPress={({focused, color, size})=> {props.navigation.navigate('Home'); setHomeToActive(true), setSummaryActive(false), setChartsToActive(false);}}  style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}
         />
        
        <DrawerItem label="Summary" 
        focused={isSummaryActive}
        icon={({focused, color, size})=> <AntDesign color={color} size={size} name={'bars'} />}
        onPress={()=> {props.navigation.navigate('Summary');  setHomeToActive(false); setSummaryActive(true); setChartsToActive(false);}} style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}/>
        <DrawerItem label="Charts" 
        focused={isChartsActive}
        icon={({focused, color, size})=> <AntDesign color={color} size={size} name={'areachart'} />}
        onPress={()=> {props.navigation.navigate('Summary'); setHomeToActive(false); setSummaryActive(false); setChartsToActive(true);}} style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}/>
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