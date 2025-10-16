import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Location = () => {const { location, errorMsg } = useLocation();

useEffect(() => {
  if (errorMsg) {
    Alert.alert("Location Error", errorMsg);
  }
}, [errorMsg]);

return (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {location ? (
      <Text>📍 Your Location: {location.latitude}, {location.longitude}</Text>
    ) : (
      <ActivityIndicator size="large" color="blue" />
    )}
  </View>
);
}

export default Location

const styles = StyleSheet.create({})