import React from 'react';
// import { Stack } from 'expo-router'
import { createStackNavigator } from '@react-navigation/stack';
import BookingFormScreen from '../../screens/booking_form';
import HomeScreen from '../../screens/HomeScreen';
import ServiceDetailsScreen from '../../screens/service_details';
import ServicesByCategories from '../../screens/servicesbycategories';
import ServicesBySearch from '../../screens/servicesbysearcch';
const Stack = createStackNavigator();

const Index = () => {
  return (
     <Stack.Navigator screenOptions={{
        headerShown:false,
    }}>
      <Stack.Screen name='home' component={HomeScreen}/>
      <Stack.Screen name='services' component={ServicesByCategories}/>
      <Stack.Screen name='servicesbysearch' component={ServicesBySearch}/>
      <Stack.Screen name='service_details' component={ServiceDetailsScreen}/>
      <Stack.Screen name='booking_form' component={BookingFormScreen}/>
    </Stack.Navigator>
    // <Stack screenOptions={{
    //     headerShown:false,
    // }}>
    //   <Stack.Screen name='home' options={{ headerShown: false }}/>
    //   <Stack.Screen name='servicesbycategories' options={{ headerShown: false }}/>
    //   <Stack.Screen name='servicesbysearcch' options={{ headerShown: false }}/>
    //   <Stack.Screen name='service_details' options={{ headerShown: false }}/>
    //   <Stack.Screen name='booking_form' options={{ headerShown: false }}/>
    // </Stack>
  )
}

export default Index