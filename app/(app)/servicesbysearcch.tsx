import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import ServiceItem from "../screens/ServiceItem";
import GlobalApi from '../utils/GlobalApi';

const ServicesBySearch = () => {
  const params = useLocalSearchParams();
  const [services, setServices] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (params?.searchstr) {
      getServicesBySearchi();
    }
  }, [params?.searchstr]);

  const getServicesBySearchi = () => {
    const q = params?.searchstr as string ?? '';
    GlobalApi.getServicesBySearch(q).then(resp => {
      setServices(resp.services);
    });
  }

  return (
    <View style={{
      padding: 20,
      paddingTop: 40,
    }}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center'
        }}>
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-medium'
        }}>Search Results for: {params?.searchstr ?? ''}</Text>
      </TouchableOpacity>

      <FlatList
        data={services}
        renderItem={({item}) => (
          <ServiceItem service={item} />
        )}
        style={{marginTop: 15}}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default ServicesBySearch;