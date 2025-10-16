import useLocation from '@/app/hooks/useLocation';
import { useUser } from '@clerk/clerk-expo';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Calender from '../subcomponents/Calender';
import Colors from '../utils/Colors';
import GlobalApi from '../utils/GlobalApi';

interface Service {
    id: string;
    name: string;
    [key: string]: any;
}

interface RouteParams {
    service: Service;
}

const BookingFormScreen = () => {
    const {latlonglocation, address, errorMsg } = useLocation();
    const {user} = useUser();
    const route = useRoute<any>();
    const [finalLatLong, setFinalLatLong] = useState("");
    const [finaladdress, setFinaladdress] = useState("N/A");
    const [service, setService] = useState<Service>((route?.params as RouteParams)?.service || { id: '', name: '' });
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    // useEffect(()=>{
    //     console.log('address='+address);
    // },[])

    const handleBooking = () => {
        if (!name || !phone || !location || !selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        if ((address?.city)!=='Bargarh') {
            Alert.alert('Error', 'Sorry, we  currently operate only in Bargarh, Odisha (India).');
            return;
        }

        const data = {
            serviceid: service?.id,
            username: user?.fullName,
            name:name,
            useremail: user?.primaryEmailAddress?.emailAddress,
            phonenumber: phone,
            location: finaladdress,
            details: details,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            time: selectedTime,
            latlong: finalLatLong,
            address: location,
        };

        
        GlobalApi.createBooking(data).then(resp=>{
            console.log(resp)
        })

       
        Alert.alert('Success', 'Your booking has been submitted.');
        

        navigation.reset({
            index: 0,
            routes: [
              {
                name: 'home'
              },
            ],
          });


    };

    useEffect(()=>{
        if (latlonglocation) {
            setFinalLatLong(`Latitude: ${latlonglocation.latitude}, Longitude: ${latlonglocation.longitude}`);
        }
        if (address?.city && address?.region && address?.country) {
            const formattedAddress = `${address.city}, ${address.region}, ${address.country}`;
            setFinaladdress(formattedAddress);
            setLocation(formattedAddress); // Autofill input field
        }
    


    },[latlonglocation, address])

    return (
        <ScrollView>
        <KeyboardAvoidingView>
            <View style={{ padding: 20, paddingTop: 40 }}>
                <Text style={{ fontSize: 20, fontFamily: 'outfit', alignSelf:'center' }}>
                    You are Booking for
                    <Text style={{
                        fontSize: 25,
                        fontFamily: 'outfit-medium',
                        color: Colors.PRIMARY,
                        fontStyle: 'italic',
                        fontWeight: '600'
                    }}> {service?.name}</Text>
                </Text>
            </View>

            <View>
                <Calender onDateSelect={setSelectedDate} onTimeSelect={setSelectedTime} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Current Location:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your location"
                    value={location}
                    onChangeText={setLocation}
                />

                <Text style={styles.label}>Additional Details:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Describe your problem or add extra details"
                    value={details}
                    onChangeText={setDetails}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Entypo name="squared-cross" size={24} color="white" />
                    <Text style={styles.buttonText}> Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.doneButton} onPress={handleBooking}>
                    <FontAwesome name="calendar-check-o" size={18} color="white" />
                    <Text style={styles.buttonText}> Confirm Booking </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default BookingFormScreen;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily:'outfit'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderColor: Colors.PRIMARY,
        fontFamily:'outfit'
    },
    textArea: {
        height: 80,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        borderColor: Colors.PRIMARY
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        marginHorizontal: 20,
        marginBottom:20
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: Colors.LIGHT_RED,
        borderRadius: 5,
    },
    doneButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    }
});