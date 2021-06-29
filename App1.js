import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './src/screens/loginScreen';
import SignupScreen from './src/screens/signupScreen';
import MainScreen from './src/screens/mainScreen';
import AccountScreen from './src/screens/accountScreen';
import PaymentScreen from './src/screens/paymentScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const loginFlow = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    )
}

const afterLoginFlow = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="MainScreen" component={MainScreen} />
            <Tab.Screen name="AccountScreen" component={Accountscreen} />
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="loginFlow" component={loginFlow} />
                <Stack.Screen name="afterLoginFlow" component={afterLoginFlow} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;