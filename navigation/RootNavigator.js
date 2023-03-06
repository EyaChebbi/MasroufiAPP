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
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default RootNavigator;




// import React from "react";
// import {
//   StyleSheet,
//   View
// } from "react-native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from "@react-navigation/native";
// import Welcome from "../screens/Welcome";
// import Login from "../screens/Login";
// import SignUp from "../screens/SignUp";
// import Forgot from "../screens/Forgot";
// import Explore from "../screens/Explore";
// import Browse from "../screens/Browse";
// import Product from "../screens/Product";
// import Settings from "../screens/Settings";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome5 } from '@expo/vector-icons';
// import Statistics from "../screens/Statistics";
// import AddExpense from "../screens/AddExpense";


// const Tab = createBottomTabNavigator();

// const Stack = createNativeStackNavigator();

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row',backgroundColor:"#F4AF5F",height:50,borderRadius:50,justifyContent:"center",alignItems:"center" }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityStates={isFocused ? ['selected'] : []}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1, alignItems:"center" }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const MyTabs= ()=> {
//   <View style={styles.footer}>
//   <Tab.Navigator  tabBar={props => <MyTabBar {...props} />}
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           if (route.name === 'Dashboard') {
//             iconName = 'chart-pie';
//           } else if (route.name === 'Planning') {
//             iconName = 'calendar-alt';
//           } else if (route.name === 'Statistics') {
//             iconName = 'chart-line';
//           } else if (route.name === 'Settings') {
//             iconName = 'cog';
//           } else if (route.name === 'Add') {
//             iconName = 'plus';
//           }

//           return <FontAwesome5 name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: '#007AFF',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       {/* <Tab.Screen name="Dashboard" component={Browse} /> */}
//       <Tab.Screen name="Statistics" component={Statistics} />
//       <Tab.Screen name="Add" component={AddExpense}/>
//       {/* <Tab.Screen name="Expenses" component={Expenses} /> */}
//       <Tab.Screen name="Settings" component={Settings}/>
//     </Tab.Navigator>

//     </View>

// }

// const RootNavigator = () => {
//   return (
//     // <NavigationContainer>
//       <Stack.Navigator>
//          <Stack.Screen
//           name="Home"
//           component={Welcome}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen name="Browse" component={Browse} />
//         <Stack.Screen name="Explore" component={Explore} />
//         <Stack.Screen name="Forgot" component={Forgot} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Product" component={Product} />
//         <Stack.Screen name="SignUp" component={SignUp} /> 
//         <Stack.Screen name="tabs" component={MyTabs}/>
//       </Stack.Navigator>
//     // </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
  
// footer: {
//   height: 70,
//   width: 'auto',
//   borderTopColor: '#ddd',
//   justifyContent: 'center',
//   padding: 10,
//   margin: 10,
//  }
// })
// export default RootNavigator;