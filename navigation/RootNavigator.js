import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Product from "../screens/Product";
import NavigationBar from "./NavigationBar";
import Home from "../screens/Home";
import BalanceTrend from "../screens/BalanceTrend";

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
        <Stack.Screen name="Browse" component={NavigationBar} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        <Stack.Screen name="BalanceTrend" component={BalanceTrend}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default RootNavigator;
