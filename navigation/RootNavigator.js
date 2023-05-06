import React, {useState} from "react";
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
import UserContext from '../server/UserContext';
import CategoryContext from "../server/CategoryContext";

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <CategoryContext.Provider value={{categories, setCategories}}>
   <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Home" component={Home} sc />
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
      </CategoryContext.Provider>
      </UserContext.Provider>

  );
}

export default RootNavigator;
