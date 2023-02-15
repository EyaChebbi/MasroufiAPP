import React from 'react';
import { Block } from './components';
import RootNavigator from './navigation/RootNavigator';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { theme } from './constants';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    background:theme.white
  },
};



// import all used images
export default function App() {
  return (
    <RootNavigator/>
    
  );
}