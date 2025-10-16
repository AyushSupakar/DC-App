import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface AddressType {
  city: string | null;
  region: string | null;
  country: string | null;
}

const useLocation = () => {
  const [latlonglocation, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<AddressType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
