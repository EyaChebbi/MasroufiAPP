import React from 'react';
import { Block } from './components';
import { View, StyleSheet } from "react-native";

import RootNavigator from './navigation/RootNavigator';
import NavigationBar from './navigation/NavigationBar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { theme } from './constants';
import Browse from './screens/Browse';
import Settings from './screens/Settings';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    background: theme.white
  },
};

export default function App() {
  return (
    // <View style={styles.container}>
    //  <Browse/> 
    //  <View style ={styles.footer}>
    //  <NavigationBar/>
    //  </View>
    // </View>
    <>
    <RootNavigator/>
    <NavigationBar/>
    
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    width: null,
    height: null,
  },
  footer: {
    height: 70,
    width: 'auto',
    borderTopColor: '#ddd',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
});