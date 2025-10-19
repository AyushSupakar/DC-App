import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface AddressType {
  city: string | null;
  region: string | null;
  country: string | null;
}

type UseLocationResult = {
  latlonglocation: LocationCoords | null;
  address: AddressType | null;
  errorMsg: string | null;
  loading: boolean;
  retry: () => Promise<void>;
  openDeviceSettings: () => Promise<void>;
};

const useLocation = (): UseLocationResult => {
  const [latlonglocation, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<AddressType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Check if device location services are enabled (Android/iOS)
      // Note: hasServicesEnabledAsync may not exist on very old expo-location versions, so guard it.
      if (typeof (Location as any).hasServicesEnabledAsync === "function") {
        const servicesEnabled = await (Location as any).hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setErrorMsg("Location services are disabled on this device. Please enable GPS/location services.");
          setLoading(false);
          return;
        }
      }

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get latitude & longitude
      const locationData = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: locationData.coords.latitude, longitude: locationData.coords.longitude });

      // Convert to human-readable address (reverse geocode)
      try {
        const [geoAddress] = await Location.reverseGeocodeAsync(locationData.coords);
        setAddress({
          city: geoAddress.city ?? null,
          region: geoAddress.region ?? null,
          country: geoAddress.country ?? null,
        });
      } catch (revErr) {
        // Non-fatal: address lookup failed
        // Keep coords but set a friendly error message if needed
        console.warn("reverseGeocodeAsync failed", revErr);
      }
    } catch (err: any) {
      // Handle known expo-location errors
      const message =
        (err && err.message) ||
        String(err) ||
        "Location request failed due to unsatisfied device settings";
      // Provide clearer guidance for the common case
      if (message.includes("unsatisfied device settings") || message.includes("Settings are not satisfied")) {
        setErrorMsg("Location request failed because required device settings are disabled (GPS). Please enable location services and try again.");
      } else {
        setErrorMsg(message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Run on mount
    fetchLocation();
  }, [fetchLocation]);

  const retry = useCallback(async () => {
    await fetchLocation();
  }, [fetchLocation]);

  const openDeviceSettings = useCallback(async () => {
    try {
      if (typeof Linking.openSettings === "function") {
        await Linking.openSettings();
        return;
      }

      // Fallback URL (iOS) or generic attempt
      const settingsUrl = "app-settings:";
      await Linking.openURL(settingsUrl);
    } catch (e) {
      console.warn("Could not open device settings", e);
    }
  }, []);

  return { latlonglocation, address, errorMsg, loading, retry, openDeviceSettings };
};

export default useLocation;
