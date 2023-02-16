import React from 'react';
import { Block } from './components';
import { View, StyleSheet } from "react-native";

import RootNavigator from './navigation/RootNavigator';
import NavigationBar from './navigation/NavigationBar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { theme } from './constants';
import Browse from './screens/Browse';

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
    <View style={styles.container}>
     <Browse/>
     <View style ={styles.footer}>
     <NavigationBar/>
     </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  footer: {
    height: 70,
    width: 'auto',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});