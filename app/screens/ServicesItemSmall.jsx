import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';

const ServicesItemSmall = ({service}) => {
    const navigation= useNavigation();
  return (
    <TouchableOpacity style={styles.container}
        onPress={()=>navigation.push('service_details',{
            service:service
         })}
    >
        <Image 
            source={{uri:service.images[0]?.url}}
            style={styles.image}
        />
        <View style={{
            margin:2,
            padding:3,
            backgroundColor:Colors.PRIMARY_LIGHT,
            borderRadius:10,
            alignSelf:'center',
        }} >
            <Text
            style={{fontSize:10, fontFamily:'outfit',
                marginHorizontal:5,
                color:Colors.PRIMARY,
                fontWeight:'bold',
                
            }}
            >{service?.name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ServicesItemSmall

const styles = StyleSheet.create({
    image:{
        width:170,
        height:110,
        borderRadius:10,
        margin:5,
        alignSelf:'center'
    },
    container:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }
})