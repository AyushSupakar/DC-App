import { useUser } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import Colors from '../../utils/Colors';
import GlobalApi from '../../utils/GlobalApi';

interface BookingService {
  name: string;
  images: { url: string }[];
}

interface Booking {
  service: BookingService;
  date: string;
  time: string;
}

const BookingScreen = () => {
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { user } = useUser();

  useEffect(() => {
    if (user) getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setBookingList(res.bookings);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}
      >
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={styles.headerText}>Your Bookings</Text>
      </TouchableOpacity>

      <FlatList
        data={bookingList}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getUserBookings}
            colors={[Colors.GREEN]}
            tintColor={Colors.GREEN}
          />
        }
       ListEmptyComponent={
  !loading ? (
    <Text style={styles.emptyText}>
      You haven’t booked any services yet.
    </Text>
  ) : null
}

        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image
              source={{ uri: item?.service?.images[0]?.url }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text
                style={styles.serviceName}
                numberOfLines={item?.service.name.length > 20 ? 2 : 1}
                ellipsizeMode="tail"
              >
                {item?.service.name}
              </Text>

              <View style={styles.dateTimeContainer}>
                <Text style={styles.dateText}>
                  {item?.date ? item.date.substring(0, 12) : ''}
                </Text>
                <Text style={styles.dateText}>{item?.time}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'outfit-medium',
  },
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 10,
  },
  serviceName: {
    fontSize: 15,
    fontFamily: 'outfit-bold',
    paddingVertical: 3,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.GREEN,
    borderRadius: 5,
  },
  dateText: {
    color: Colors.GREEN,
    fontFamily: 'outfit',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
    fontFamily: 'outfit',
  },
});
