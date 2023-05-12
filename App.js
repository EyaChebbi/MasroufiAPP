import React, {useState} from 'react';
import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import RootNavigator from './navigation/RootNavigator';
import { DefaultTheme } from '@react-navigation/native';
import { theme } from './constants';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    background: theme.white
  },
};

export default function App() {
  
const [refreshing, setRefreshing] = useState(false);

const handleRefresh = () => {
  setRefreshing(true);

  // Perform your refresh logic here
  // For example, fetch new data from an API

  setTimeout(() => {
    setRefreshing(false);
  }, 2000); // Simulating a delay for demonstration purposes
};

  return (
    <>
        <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >

    <RootNavigator/>
    </ScrollView>
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