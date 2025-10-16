import { useUser } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SignOutButton from '../subcomponents/SignOutButton';
import Colors from '../utils/Colors';

const Header = ({showsearch}) => {
    const {user, isLoading} = useUser();
    const [searchstr, setSearchstr] = useState("");  
    const router = useRouter();

    const searchfun = () => {
        const trimmedSearch = searchstr.trim();
        if (trimmedSearch.length > 0) {
            router.push({
                pathname: '/servicesbysearcch',
                params: { searchstr: trimmedSearch }
            });
            // Reset search string after search
            setSearchstr("");
        } else {
            alert("Please enter a search term");
        }
    }

  return user&&(
    <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.ProfileMainContainerx}>
            <View style={styles.profileContainer}>    
                <Image source={{uri:user.imageUrl}}
                        style={styles.userImage}/>
                <View>
                    <Text style={{color:Colors.WHITE, fontFamily:'outfit'}} >Welcome,</Text>
                    <Text style={{color:Colors.WHITE, fontSize:20, fontFamily:'outfit-medium'}}>{user?(((user?.fullName)?.split(" ")[0])+" "+(((((user?.fullName)?.split(" "))?.length)>1)?((user?.fullName).split(" ")[1]):(""))):("Dear User")}</Text>
                </View>
        </View>
            <SignOutButton />
 
       
    </View>
        {/* Search Bar Section */}
        {showsearch && (<View style={styles.searchBarContainer} >
            <TextInput placeholder='search'
            value={searchstr}
            onChangeText={(text)=>setSearchstr(text)}
            style={styles.textInput}
            />
            <TouchableOpacity
                onPress={searchfun}
            >
            <Feather
                style={styles.searchBtn}
            name="search" size={16} color={Colors.PRIMARY} />
            </TouchableOpacity>
        </View>)}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        padding:15,
        paddingTop:15,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        justifyContent:'center'
    },
    searchBarContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:20,
        gap:10,
        marginBottom:20
    },
    textInput:{
        backgroundColor:Colors.WHITE,
        padding:7,
        paddingHorizontal:16,
        borderRadius:8,
        width:'85%',
        fontSize:16,
        fontFamily:'outfit',

    },
    searchBtn:{
         backgroundColor:Colors.WHITE,
         padding:10,
         borderRadius:10,
    },
    ProfileMainContainerx: {
        display:'flex',
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    userImage:{
        width:50,
        height:50,
        borderRadius:50
    }
})