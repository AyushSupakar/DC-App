import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import museLocation from '../hooks/museLocation';
import Categories from "./Categories";
import Header from './Header';
import Services from "./Services";
import Slider from './Slider';

const HomeScreen = () => {
  const [showsearch, setShowSearch] = useState(true);
  const { errorMsg } = museLocation();

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Location Error", errorMsg);
    }
  }, [errorMsg]);
  return (<View >
      <Header showsearch={showsearch} />
      <View style={{padding:20}}>
      <Slider/>
      <Categories showsearch={showsearch} setShowSearch={setShowSearch} />
    <View style={{ display:'flex',  alignItems:'center', justifyContent:'center'}} >
      <Services/>
    </View>

      </View>
    </View>)
}

export default HomeScreen

const styles = StyleSheet.create({
  
})