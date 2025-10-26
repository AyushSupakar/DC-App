import useLocation from '@/app/hooks/useLocation';
import { useUser } from '@clerk/clerk-expo';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Calender from '../subcomponents/Calender';
import Colors from '../utils/Colors';
import GlobalApi from '../utils/GlobalApi';
import { sanitizeString } from '../utils/sanitizeString';

interface Service {
    id: string;
    name: string;
    [key: string]: any;
}

const BookingFormScreen = () => {
    const {latlonglocation, address, errorMsg, loading, retry, openDeviceSettings } = useLocation();
    const {user} = useUser();
    const params = useLocalSearchParams();
    const router = useRouter();
    
    const service: Service = params.service 
        ? JSON.parse(params.service as string) 
        : { id: '', name: 'Unknown Service' };

    const [finalLatLong, setFinalLatLong] = useState("");
    const [finaladdress, setFinaladdress] = useState("N/A");
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleBooking = () => {
        if (!name || !phone || !location || !selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        if ((address?.city)!=='Bargarh') {
            Alert.alert('Error', 'Sorry, we currently operate only in Bargarh, Odisha (India).');
            return;
        }

        const data = {
            serviceid: service?.id,
            username: user?.fullName ?? 'Email User',
            name:sanitizeString(name),
            useremail: user?.primaryEmailAddress?.emailAddress,
            phonenumber: sanitizeString(phone),
            location: sanitizeString(finaladdress),
            details: sanitizeString(details),
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            time: sanitizeString(selectedTime),
            latlong: finalLatLong,
            address: sanitizeString(location),
        };
        
        GlobalApi.createBooking(data).then(resp=>{
            console.log(resp)
        })
       
        Alert.alert('Success', 'Your booking has been submitted.');
        
        router.replace('/');
    };

    useEffect(()=>{
        if (latlonglocation) {
            setFinalLatLong(`Latitude: ${latlonglocation.latitude}, Longitude: ${latlonglocation.longitude}`);
        }
        if (address?.city && address?.region && address?.country) {
            const formattedAddress = `${address.city}, ${address.region}, ${address.country}`;
            setFinaladdress(formattedAddress);
            setLocation(formattedAddress);
        }
    },[latlonglocation, address])

     return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={{ padding: 0, paddingTop: 0, backgroundColor: Colors.LIGHT_GRAY}}>
                <View style={{ padding: 20, paddingTop: 40, backgroundColor: Colors.LIGHT_GRAY}}>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit', alignSelf:'center',
                        
                     }}>
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

                    {loading ? (
                        <Text style={{color:Colors.GREEN, marginBottom: 10 }}>Checking location permission...</Text>
                    ) : null}

                    {errorMsg ? (
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{ color: 'red', marginBottom: 8 }}>{errorMsg}</Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TouchableOpacity
                                    style={[styles.smallButton, styles.settingsButton]}
                                    onPress={openDeviceSettings}
                                >
                                    <Text style={styles.buttonText}>Open Settings</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.smallButton, styles.retryButton]}
                                    onPress={retry}
                                >
                                    <Text style={styles.buttonText}>Retry</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}

                    <Text style={styles.label}>Additional Details:</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Describe your problem or add extra details"
                        value={details}
                        onChangeText={setDetails}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.cancelButton]}
                        onPress={() => router.back()}
                    >
                        <Entypo name="squared-cross" size={24} color="white" />
                        <Text style={styles.buttonText}> Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.doneButton, !latlonglocation && styles.disabledButton]}
                        onPress={handleBooking}
                        disabled={!latlonglocation}
                    >
                        <FontAwesome name="calendar-check-o" size={18} color="white" />
                        <Text style={styles.buttonText}> Confirm Booking </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginBottom:30
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
    smallButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
    },
    settingsButton: {
        backgroundColor: Colors.PRIMARY,
    },
    retryButton: {
        backgroundColor: Colors.LIGHT_GREEN,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
    }
});

