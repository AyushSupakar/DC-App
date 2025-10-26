module.exports = {
  expo: {
    name: "dc_app",
    slug: "dc_app",
    version: "1.0.7",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "dcapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    "plugins": [
      "expo-router",
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 35,
            "targetSdkVersion": 35,
            "buildToolsVersion": "35.0.0" // Or a similar version for Android 15/API 35
          },
        }
      ], // Existing plugin
  [
    "expo-splash-screen",
    {
      "image": "./assets/images/splash-icon.png", // Path to your splash screen image
      "resizeMode": "contain", // or "cover"
      "backgroundColor": "#E6F4FE", // Background color
          "imageWidth": 200,
    }
  ]
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