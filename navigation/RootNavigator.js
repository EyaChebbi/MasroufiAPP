import React from "react";
import { Image } from "react-native";

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



const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Welcome}
            options={{title: 'Welcome'}}
          />
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