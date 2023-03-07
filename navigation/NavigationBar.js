import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet } from "react-native";
import Statistics from "../screens/Statistics";
import Home from '../screens/Home';
import Expenses from "../screens/Expenses";
import Settings from "../screens/Settings";
import AddExpense from "../screens/AddExpense";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from '../screens/Welcome';


const Tab = createBottomTabNavigator();

function NavigationBar() {
  return (

<View style={styles.footer}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'chart-pie';
          } else if (route.name === 'Expenses') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Stats') {
            iconName = 'chart-line';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          } else if (route.name === 'Add') {
            iconName = 'plus';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007AFF',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Expenses" component={Expenses} />
      <Tab.Screen name="Add" component={AddExpense} options={{ tabBarLabel : () => null}}/>
      <Tab.Screen name="Stats" component={Statistics} />
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
    </View>
  );
}
export default NavigationBar;
const styles = StyleSheet.create({

  footer: {
    flex: 1,
    height: 70,
    width: 'auto',
    borderTopColor: '#ddd',
    padding: 5,
    justifyContent: 'space-around',
   }
  })