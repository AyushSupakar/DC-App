import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlobalApi from '../utils/GlobalApi';

import ServiceItem from "./ServiceItem";

type RouteParams = { category: string };

const ServicesByCategories = () => {
  const param = useRoute().params as RouteParams;
  const[services, setServices] = useState([]);

  useEffect(()=>{
    if (param && 'category' in param) {
      console.log("Category", param.category);
      getServicesByCategoryi();
    }
  },[])
  const navigation = useNavigation();
  const getServicesByCategoryi = ()=>{
    GlobalApi.getServicesByCategory(param?.category).then(resp=>{
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
      }}>{param.category}</Text>
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

export default ServicesByCategories

const styles = StyleSheet.create({})