import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import uudaiScreen from '../screens/uudaiScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createMaterialBottomTabNavigator();



const BottomTabNavigator = () => {
  const [soLuongTrenIcon, setSoLuongTrenIcon] = useState(0);
  useEffect(() => {
    // Lắng nghe sự thay đổi trong state soLuongTrenIcon
    if (soLuongTrenIcon > 0) {
      // Cập nhật biểu tượng số lượng trên biểu tượng giỏ hàng
      Tab.setOptions({
        tabBarBadge: soLuongTrenIcon,
      });
    }
  }, [soLuongTrenIcon]);
  
  return (
    <Tab.Navigator
    initialRouteName="Home"
    shifting={true}
    barStyle={{ backgroundColor: '#ffffff' }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline'; // Sử dụng icon từ Ionicons
         
        } else if (route.name === 'Setting') {
          iconName = focused ? 'settings' : 'settings-outline';
      
        }
        else if (route.name === 'uudai') {
          iconName = focused ? 'gift' : 'gift-outline';
          
        }
        else if (route.name === 'cart') {
          iconName = focused ? 'cart' : 'cart-outline';
          
        }

        return <Ionicons name={iconName} size={24} color={focused ? '#007AFF' : '#8E8E93'} />;
        //return <Image source={iconName} style={{ width: 24, height: 24 }} />;
      },
    })}
  >
    
     <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
      <Tab.Screen name="uudai" component={uudaiScreen} />
      {/* <Tab.Screen name="cart" component={CartScreen} /> */}
      <Tab.Screen
  name="cart"
  component={CartScreen}
  options={{
    tabBarBadge: soLuongTrenIcon > 0 ? soLuongTrenIcon : null,
  }}
  listeners={({ navigation, route }) => ({
    tabPress: (e) => {
      navigation.navigate('cart', {
        cartItems: cart, // Truyền danh sách sách trong giỏ hàng
        bookDetails: { ...book, quantity: quantity }, // Truyền thông tin sách mới thêm vào
        total: calculateTotal(), // Truyền tổng tiền
      });
    },
  })}
/>
  </Tab.Navigator>
  );
};

export default BottomTabNavigator;
