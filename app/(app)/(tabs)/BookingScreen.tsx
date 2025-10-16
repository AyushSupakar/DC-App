import { useUser } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const {user} = useUser();

    useEffect(()=>{
      user&&getUserBookings();
    },[user])

    const getUserBookings=()=>{
      setLoading(true);
      GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress).then(res=>{
          // console.log(res);
          setBookingList(res.bookings)
          setLoading(false);
      })
    }

  return (
    <View
    style={{
      padding:20,
      paddingTop:40,
    }}
    >
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
            }}>Your Bookings</Text>
            </TouchableOpacity>

            <View
              style={{
                marginBottom:40,
                padding:10
              }}
            >
              <FlatList<Booking>
                data={bookingList}
                onRefresh={()=>getUserBookings()}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                renderItem={({item}: {item: Booking})=>(
                  <View style={styles.container}>
                        <Image
                          source={{ uri: item?.service?.images[0]?.url }}
                          style={styles.image}
                        />
                        <View style={styles.textContainer}>
                          <Text 
                            style={styles.serviceName} 
                            numberOfLines={item?.service.name.length > 20 ? 2 : 1} // Wrap only for long names
                            ellipsizeMode="tail"
                          >
                            {item?.service.name}
                          </Text>
                          <View
                            style={{
                              display:'flex',
                              flexDirection:'column',
                              justifyContent:'space-between',
                              gap:5,
                            }}
                          >
                            <View
                              style={{
                                display:'flex',
                                flexDirection:'row',
                                gap:5,
                                 
                                alignItems:'center',
                                justifyContent:'center',
                                paddingHorizontal:10,
                                padding:5,
                                borderWidth:1,
                                borderBlockColor:Colors.GREEN,
                                borderRadius:5,
                              }}
                            >
                              <Text
                                style={{
                                  color:Colors.GREEN,
                                  fontFamily:'outfit'
                                }}
                              >
                                {item?.date ? item.date.substring(0, 12) : ''}
                              </Text>
                              <Text
                                style={{
                                  color:Colors.GREEN,
                                  fontFamily:'outfit'
                                }}
                              >
                                {item?.time}
                              </Text>

                            </View>
                  
                            
                  
                          </View>
                        </View>
                      </View>
                )}
              />
            </View>
      
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({
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
    flex:1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    gap:10,
    paddingHorizontal:10,
  },
  serviceName: {
    fontSize: 15,
    fontFamily: 'outfit-bold',
    paddingVertical:3,
  },
})