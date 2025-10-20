import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ServiceItem from "./ServiceItem";
import GlobalApi from '../utils/GlobalApi';

const ServicesBySearch = () => {
  const route = useRoute();
  const params = (route.params as { searchstr?: string } | undefined) ?? undefined;
  const [services, setServices] = useState<any[]>([]);

  

  useEffect(()=>{
    
    if (params?.searchstr) getServicesBySearchi();
  },[])
  const navigation = useNavigation();
  const getServicesBySearchi = ()=>{
    const q = params?.searchstr ?? '';
    GlobalApi.getServicesBySearch(q).then(resp=>{
      // console.log(resp.services);
      setServices(resp.services);
      
    })
  }
  return (
    <View style={{
      padding:20,
      paddingTop:40,
    }}>

      <TouchableOpacity 
        onPress={()=>navigation.goBack()}
      style={{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
      }}>

      <Feather name="arrow-left" size={24} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium'
      }}>Search Results for: {params?.searchstr ?? ''}</Text>
      </TouchableOpacity>

      <FlatList
        data={services}
        renderItem={({item, index})=>(
          <ServiceItem service={item}/>
        )}
      />

    </View>
  )
}

export default ServicesBySearch

const styles = StyleSheet.create({})