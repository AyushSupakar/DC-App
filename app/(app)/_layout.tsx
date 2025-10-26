import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

import { useAuth } from '@clerk/clerk-expo'
import Colors from '../utils/Colors'
//stack->issignedin
const Layout = () => {
  const {isSignedIn, isLoaded} = useAuth();
  if(!isLoaded){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    )
  };
  return (
    <Stack>
      <Stack.Protected guard={isSignedIn? true : false}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />      
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="welcome" options={{ headerShown: false }} /> 
        <Stack.Screen name="sign-in" options={{ headerShown: false }} /> 
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />      
      </Stack.Protected>
    </Stack>
  )
}

export default Layout