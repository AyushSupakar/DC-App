import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import Colors from '../utils/Colors';

interface Service {
  id?: string;
  name?: string;
  images?: { url?: string }[];
  category?: { name?: string }[];
  about?: string;
  email?: string;
  [key: string]: any;
}

const ServiceDetailsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const params = (route.params as { service?: Service } | undefined) ?? {};
  const service: Service | null = params.service ?? null;

  const handleOpenWebsite = () => {
    Linking.openURL('https://www.dashconstructions.in/').catch((err) =>
      console.error('Failed to open website:', err)
    );
  };

  return (
    <ScrollView>
      {service?.images && service.images.length > 0 ? (
        <Image source={{ uri: service.images[0]?.url }} style={styles.hero} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{service?.name ?? 'Service'}</Text>

      <FlatList
        data={service?.category ?? []}
        keyExtractor={(item, index) => (item?.name ? item.name : String(index))}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
      />

      <View style={styles.container}>
        <Text style={styles.texts}>{service?.about ?? 'No details available.'}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.texts}>For more information, send us your queries at:</Text>
        <Text style={[styles.texts, styles.bold]}>{service?.email ?? 'N/A'}</Text>
      </View>

      {/* ✅ Added company website link */}
     <View style={[styles.container, { alignItems: 'center', marginTop: 5 }]}>
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={handleOpenWebsite}
    style={styles.websiteCard}
  >
    <Ionicons name="globe-outline" size={22} color={Colors.PRIMARY} />
    <Text style={styles.websiteCardText}>Visit Dash Constructions Website</Text>
    <Ionicons name="open-outline" size={20} color={Colors.PRIMARY} />
  </TouchableOpacity>
</View>


      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.actionText}> Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.push('booking_form', { service })}
        >
          <FontAwesome name="calendar-check-o" size={18} color="white" />
          <Text style={styles.actionText}> Book</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  hero: { width: '100%', height: 240 },
  placeholder: { width: '100%', height: 240, backgroundColor: '#eee' },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    margin: 10,
    paddingHorizontal: 10,
  },
  categoryList: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    margin: 6,
    padding: 6,
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'outfit',
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  texts: {
    fontFamily: 'outfit-medium',
    fontSize: 15,
    textAlign: 'justify',
    paddingHorizontal: 5,
  },
  bold: {
    fontFamily: 'outfit-bold',
  },
  websiteLink: {
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
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    padding: 6,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
  },
  actionText: { color: 'white' },
    websiteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  websiteCardText: {
    flex: 1,
    textAlign: 'center',
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },

});
