import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import GlobalApi from '../utils/GlobalApi';

import Colors from '../utils/Colors';
import ServiceItemSmall from './ServicesItemSmall';


const Services = () => {

    const[servicesList, setServicesList] = useState([]);

        const [flhor, setFlhor] = useState(true);
        const [numcol, setNumcol] = useState(1);
        const [key, setKey] = useState("flatlist-horizontal");

        const switchView = () => {
            const isHorizontal = !flhor;
            setFlhor(isHorizontal);
            setNumcol(isHorizontal ? 1 : 4);
            setKey(`flatlist-${isHorizontal ? "horizontal" : "grid"}`); // Change key to force re-render
        };

        useEffect(()=>{
            getServicesList();
        },[])

        const getServicesList = () => {
            GlobalApi.getServices().then(resp=>{
                // console.log(resp);
                setServicesList(resp.services);
            })
        }



  return (
    <View style={{display:'flex', marginTop: 15, justifyContent:'center'}}>
        {/* Heading */}
        <View style={styles.container}>
                      <Text style={styles.heading}>Services</Text>
        </View>

        {/* Services */}
        <View >
        <FlatList
            data={servicesList}
            horizontal={true}
        showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View style={{margin:5}}>
                    <ServiceItemSmall service={item} />
                </View>
            )}
        />
        </View>

                
    </View>
  )
}

export default Services


const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 15,
        borderRadius: 99,
        margin: 6,
        justifyContent: 'center',
        textAlign: 'center'
    },
    containerCat: {},
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:5,
        marginTop:5,
    }
});
