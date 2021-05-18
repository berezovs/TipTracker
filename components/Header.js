import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements'

const HeaderComponent = ({navigation}) =>{
  
  return(
    <Header
      statusBarProps={{ barStyle: 'light-content', backgroundColor: 'red'}}
      centerComponent={{
        text: 'MyTipTracker',
        style: { color: "#fff", fontSize: 23, padding: 5 }
      }}
      
      leftComponent={<MenuIcon navigation={navigation}/>}
      placement="center"
      rightContainerStyle={{}}
      statusBarProps={{}}


      
  />
  )}

  const MenuIcon = ({navigation}) => {  
    const openSideMenu = () => {
      navigation.openDrawer();
    }
    return (
      <Icon
      name='menu'
      color = '#fff'
      iconStyle = {{padding: 5}}
      onPress = {openSideMenu}/>

  )}

  export default HeaderComponent;