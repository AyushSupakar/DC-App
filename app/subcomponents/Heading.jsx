import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Heading = ({text, isViewAll=false}) => {
  return (
    <View style={styles.container}>
       <Text style={styles.heading}>{text}</Text>
      {isViewAll && <Text>View All</Text>}
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({heading:{
    fontSize:20,
    fontFamily:'outfit-medium',
    
  },
  container:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:5
  }
})