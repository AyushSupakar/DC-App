import * as Location from "expo-location";
import { useEffect, useState } from "react";

/**
 * @returns {{
 *   latlonglocation: { latitude: number, longitude: number } | null,
 *   address: { city: string, region: string, country: string } | null,
 *   errorMsg: string | null
 * }}
 */
const useLocation = () => {
  const [latlonglocation, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get latitude & longitude
      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);

      // Convert to human-readable address
      const [geoAddress] = await Location.reverseGeocodeAsync(locationData.coords);
      setAddress(geoAddress);
    })();
  }, []);

  return { latlonglocation, address, errorMsg };
};

export default useLocation;
