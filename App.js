import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import LoginScreen from './src/screens/loginScreen';
import SignupScreen from './src/screens/signupScreen';
import MainScreen from './src/screens/mainScreen';
import AccountScreen from './src/screens/accountScreen';
import PaymentScreen from './src/screens/paymentScreen'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function afterLoginFlow() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.ThemeColor)
  // console.log(currentTheme)

  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{
        title: 'Mess Service',
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <Button
            onPress={() => {
              if (currentTheme) dispatch({ type: 'LIGHT_THEME' });
              else dispatch({ type: 'DARK_THEME' });
            }}
            title="Change Theme"
            color="#000"
          />
        ),
      }} />

      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{
        title: ' Your Cart',
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </Stack.Navigator>
  );
}

const Accountscreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="accountScreen" component={AccountScreen} options={{
        title: 'Account ',
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </Stack.Navigator>

  )
}

const App = () => {
  return (
    <Tab.Navigator activeColor="white"
      inactiveColor="#a6a6a6"
      labeled={false}
      barStyle={{ backgroundColor: 'black', }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 28
          if (route.name === 'HomeScreen') {
            iconName = 'ios-home'
          } else if (route.name === 'Account') {
            iconName = 'body'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="HomeScreen" component={afterLoginFlow} />
      <Tab.Screen name="Account" component={Accountscreen} />
    </Tab.Navigator>
  )
}

const mainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="AccountScreen" component={Accountscreen} /> */}
        <Stack.Screen name="App" component={App} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default mainApp;

