import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";


//import BrowseOriginal from "../screens/BrowseOriginal"
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome5 } from '@expo/vector-icons';
// import Statistics from "../screens/Statistics";
// import Expenses from "../screens/Expenses";
// import AddExpense from "../screens/AddExpense";
// const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Welcome}
          options={{ title: 'Welcome' }}
        />
        {/* <Stack.Screen name="Browse">
                    {(props) => <Browse {...props} isLoggedIn={isLoggedIn} />}
                </Stack.Screen>  */}
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;