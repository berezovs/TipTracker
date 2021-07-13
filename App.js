import 'react-native-gesture-handler';
import  React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'; 
import {Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TipComponent from './screens/Summaryscreen.js';
import Home from './screens/AddTipscreen.js';
import Header from  './components/Header.js'




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
  <Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#4287f5',
    },
    headerTitle: ({children})=><Header children={children}/>,
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name ="Add Tip" component={Home}/>
    <Stack.Screen name="Summary" options={{ headerShown: false }} component={TipComponent} />
  </Stack.Navigator>
  )
}

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1,alignItems: 'center', justifyContent: 'space-evenly'}}>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Add Tip')}}>
      <AntDesign name='wallet' size={35} color='#fff'/>
        <Text style={{fontSize: 24, color:'#fff'}}>Add Tip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Summary')}>
      <AntDesign name='bars' size={35} color='#fff'/>
        <Text style={{fontSize: 24, color:'#fff'}}>Summary</Text>
      </TouchableOpacity>
      <View style={{flex: 7}}></View>

    </View>
  )
}

const styles=StyleSheet.create({
  button: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around', 
    backgroundColor: '#4287f5',
    width: 300,
    paddingHorizontal: 50, 
    paddingVertical: 20, 
    borderRadius: 5, 
    marginTop: 20,
   
  }
})
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
         onPress={({focused, color, size})=> {props.navigation.navigate('Home'); setHomeToActive(true), setSummaryActive(false), setChartsToActive(false);}}  style={{borderBottomEndRadius: 0, borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginVertical: 0}}
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
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;