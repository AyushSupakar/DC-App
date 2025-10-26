import React, { useCallback, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking' // 👈 Needed for creating the native redirect URI
import { useSSO } from '@clerk/clerk-expo' // 👈 Using the modern, correct hook
import { View, Button, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native'
// Assuming you have a Colors import
import Colors from '../utils/Colors' 
import { useRouter } from 'expo-router' // 👈 Added: Needed for navigation after sign-in

// 1. Warm up and complete browser session (Standard Expo practice)
WebBrowser.maybeCompleteAuthSession()

// Function to get the native redirect URI
const getNativeRedirectUrl = () => {
    // 🛑 CRITICAL: Uses your app's scheme ('dcapp' from app.config.js) 
    // and the Clerk-specific path ('oauth-native-redirect')
    return Linking.createURL('/oauth-native-redirect', { scheme: 'dcapp' })
}

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

export default function GoogleSignIn() {
  useWarmUpBrowser() // Call the warm-up function
  const router = useRouter() // Initialize router
  
  // Use the `useSSO()` hook
  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      const redirectUrl = getNativeRedirectUrl() // e.g., dcapp://oauth-native-redirect

      // Start the SSO flow with the correct strategy and the fixed redirect URL
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: redirectUrl,
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId })
        // Navigate to your main screen after successful sign-in
        router.replace('/') 
      } else {
        // Handle missing requirements (e.g., need to collect a username)
      }
    } catch (err) {
      // Log the error to see why the browser isn't launching/redirecting
      // This is crucial for debugging production failures
      console.error('SSO Flow Error:', JSON.stringify(err, null, 2))
    }
  }, [startSSOFlow, router])

  return (
    <View>
      <TouchableOpacity style={styles.googleButton} onPress={onPress}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: '#4285F4', // Google Blue
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    googleButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    }
})