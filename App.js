import React from 'react';
import { View, StyleSheet } from "react-native";
import RootNavigator from './navigation/RootNavigator';
import { DefaultTheme } from '@react-navigation/native';

import { theme } from './constants';

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
    <>
    <RootNavigator/>
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