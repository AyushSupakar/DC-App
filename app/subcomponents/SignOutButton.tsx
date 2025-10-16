import { useClerk } from '@clerk/clerk-expo';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut()
      await WebBrowser.dismissBrowser()
      router.replace('/welcome'); // Navigate to welcome screen after sign out
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (

       <TouchableOpacity style={styles.button} onPress={handleSignOut} >
          <Text style={{textAlign:'center', fontSize:12, color:Colors.PRIMARY, fontFamily:'outfit', fontWeight:'bold' }}> SignOut </Text>
          <Entypo name="log-out" size={14} color={Colors.PRIMARY} />
        </TouchableOpacity>
  )
}

export default SignOutButton


const styles = StyleSheet.create({
    button:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:99,
        alignSelf:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:3,
    }

})