import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={80} color="#4A90E2" style={styles.icon} />
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.name}>Welcome, {user?.firstName} {user?.lastName}</Text>
        <Text style={styles.email}>Email: {user?.primaryEmailAddress?.emailAddress}</Text>

        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.signOutText}>Sign Out</Text>
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
    fontSize: 18,
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
});
