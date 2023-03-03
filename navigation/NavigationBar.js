import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import Statistics from "../screens/Statistics";
import Browse from "../screens/Browse";
import Expenses from "../screens/Expenses";
import Settings from "../screens/Settings";
import AddExpense from "../screens/AddExpense";
import { NavigationContainer } from "@react-navigation/native";


const Tab = createBottomTabNavigator();

function NavigationBar() {
  return (
    <NavigationContainer>

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'chart-pie';
          } else if (route.name === 'Planning') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Statistics') {
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
    >
      <Tab.Screen name="Dashboard" component={Browse} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="Add" component={AddExpense}/>
      {/* <Tab.Screen name="Expenses" component={Expenses} /> */}
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>

    </NavigationContainer>
  );
}
export default NavigationBar;