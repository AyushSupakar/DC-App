import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
//(tabs)->tabs->home,profile
const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false, title:"Home", tabBarIcon:({color, size})=>(<AntDesign name="home" color={color} size={size}/>),}} />
      <Tabs.Screen name="profile" options={{ headerShown: false, title:"Profile", tabBarIcon:({color, size})=>(<AntDesign name="user" color={color} size={size}/>),}} />
      <Tabs.Screen name="BookingScreen" options={{ headerShown: false, title:"Bookings", tabBarIcon:({color, size})=>( <MaterialIcons name="event" size={size} color={color} />),}} />
    </Tabs>
  )
}

export default Layout