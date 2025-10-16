import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from "./../utils/Colors";
import React, { useCallback, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'
import Colors from './../utils/Colors';
import { Link } from 'expo-router';


export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

const Login = () => {

  return (
    <View style={{alignItems:'center'}}>
    <Image source={require('./../../assets/images/fs9.jpeg')} 
        style={styles.loginImage} />
    
    <View style={styles.subContainer}> 
          <Text style={{color:Colors.WHITE, fontSize:27, textAlign:'center'}}> 
            We Provide
            <Text style={{fontWeight:'bold'}} >The Best Professional Construction and Repair </Text> Services
          </Text>
          <Text style={{fontSize:17, color:Colors.WHITE, textAlign:'center', marginTop:20 }}> Book any Constrcution, Repair or Home Renovation Service you need..</Text>             
        <View style={styles.button} >
          <Link href="./sign-up">
                        <Text style={{textAlign:'center', fontFamily:'outfit-bold', fontSize:17, color:Colors.PRIMARY}}> Let's Get Started </Text>
                      </Link>
        </View>     
    </View>

</View>
  )
}

export default Login

const styles = StyleSheet.create({
    loginImage:{
        width:'95%',
        height:400,
        marginTop:30,
        
        borderRadius:50,
    },
    subContainer:{
       width:'100%',
       padding:20,
       height:'75%',
       marginTop:-25,
       backgroundColor:Colors.PRIMARY,
       borderTopLeftRadius:30,
       borderTopRightRadius:30,
    },
    button:{
        backgroundColor:Colors.WHITE,
        padding:15,
        borderRadius:99,
        marginTop:40,
        alignSelf:'center',
        alignItems:'center',
    }

})