import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:22 }}>Ubicación</Text>
      {location ? (
        <>
          <Text>Lat: {location.latitude}</Text>
          <Text>Lon: {location.longitude}</Text>
        </>
      ) : (
        <Text>Cargando ubicación...</Text>
      )}
    </View>
    
  );
}
