import { View, Text, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  FlatList,
  Linking,
  ScrollView,
  
} from 'react-native';

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
        }
      }
    ]);
  };

  const handleOpenWebsite = () => {

    Alert.alert("Delete User Data", "Are you sure you want to permanently delete your user data?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes",
        style: "destructive",
        onPress:  () => {
          Linking.openURL('https://forms.gle/be3fQ8rKSrXKGoPt7').catch((err) =>
          console.error('Failed to open User Delete Page', err)
      );
          
        }
      }
    ]);
      
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        {(user?.imageUrl)?(<Image source={{uri:user?.imageUrl}}
                        style={styles.userImage}/>):(<Ionicons name="person-circle-outline" size={80} color="#4A90E2" style={styles.icon} />)}
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.name}>Welcome, {(user?.firstName)?(user?.firstName + " " + user?.lastName):("Dear User")}</Text>
        <Text style={styles.email}>Email: {user?.primaryEmailAddress?.emailAddress}</Text>

        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

         
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenWebsite}
          style={styles.websiteCard}
        >
          <MaterialIcons name="delete-forever" size={22} color={Colors.RED} />
          <Text style={styles.websiteCardText}>Permanently Delete User Data?</Text>
          
        </TouchableOpacity>
      

      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 25,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    userImage:{
        width:80,
        height:80,
        borderRadius:50
    },websiteLink: {
        fontFamily: 'outfit-medium',
        fontSize: 16,
        color: Colors.PRIMARY,
        textDecorationLine: 'underline',
      },
      actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
        marginHorizontal: 20,
      },  actionText: { color: 'white' },
          websiteCard: {
            marginVertical:40,
            marginHorizontal:10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.VERY_LIGHT_RED,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
          width: '100%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        },
        websiteCardText: {
          flex: 1,
          textAlign: 'center',
          color: Colors.RED,
          fontFamily: 'outfit-medium',
          fontSize: 14,
        },
});
