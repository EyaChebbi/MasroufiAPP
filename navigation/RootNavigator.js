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
import AddTransaction from "../screens/AddTransaction";
import BalanceTrend from "../screens/BalanceTrend";
import Categories from "../screens/Categories";
import AddCategory from "../screens/AddCategory"
import Records from "../screens/Records";

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
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        <Stack.Screen name="BalanceTrend" component={BalanceTrend}/>
        <Stack.Screen name="Categories" component={Categories}/>
        <Stack.Screen name="AddCategory" component={AddCategory}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default RootNavigator;
