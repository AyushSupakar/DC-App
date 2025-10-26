import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import * as SecureStore from 'expo-secure-store'

import { Slot } from 'expo-router'
//clerkprovider->slot
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}
    publishableKey="pk_live_Y2xlcmsuYXl1c2hzdXBha2FyYXBwLmNvLmluJA">
      <Slot />
    </ClerkProvider>
  )
}