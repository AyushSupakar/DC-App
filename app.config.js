module.exports = {
  expo: {
    name: "dc_app",
    slug: "dc_app",
    version: "1.0.4",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "dcapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    "plugins": [
      "expo-router"
    ],
   extra: {
    // 1. Clerk Publishable Key (for the client app)
    
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,

    // 2. Hygraph Keys (for the client app content fetching)
    HYGRAPH_URL: process.env.HYGRAPH_URL,
    HYGRAPH_TOKEN: process.env.HYGRAPH_TOKEN,

    // 3. Expo Router/EAS Config
    router: {
        origin: false
    },
    "eas": {
        "projectId": "c0b3af4e-63a7-4400-9d1f-dd05b260140e"
    }
},
    "owner": "ayushsupakar",
    ios: {
      supportsTablet: true
    },
    
    android: {
      package: "com.dc_app",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundImage: "./assets/images/adaptive-icon.png",
        monochromeImage: "./assets/images/adaptive-icon.png"
      }
    }
  }
};