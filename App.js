import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import DetailScreen from './screens/DetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import PaymentScreen from './screens/PaymentScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import chinhsachbaomat from './component/chinhsachbaomat';
import chinhsachdoitra from './component/chinhsachdoitra';
import uudaiScreen from './screens/uudaiScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './component/BottomTabNavigator';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



const Stack = createStackNavigator();
export default function App() {
  
  return (
  
   
    <NavigationContainer>
       
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="uudai" component={uudaiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Invoice" component={InvoiceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="chinhsach" component={chinhsachbaomat} options={{ headerShown: false }} />
        <Stack.Screen name="chinhsachdoitra" component={chinhsachdoitra} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="chinhsach" component={chinhsachbaomat} options={{ headerShown: false }} />
        <Stack.Screen name="chinhsachdoitra" component={chinhsachdoitra} options={{ headerShown: false }} />
      </Stack.Navigator>
    
    </NavigationContainer>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
