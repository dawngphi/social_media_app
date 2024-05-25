import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderBar from './component/HeaderBar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const AboutSreen = () => {
  return (
    <View style = {styles.Container}>
      <HeaderBar title="About" />
      <View style={styles.OptionContainer}>
                <TouchableOpacity style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:16, marginTop:10 }]}>
                    <Text style={[styles.TextStyle2, { marginLeft: 10 }]}>Privacy Policy</Text>
                    <FontAwesomeIcon icon={faChevronRight} size={15} color="#000" style={{ marginRight: 26 }} />
                </TouchableOpacity>
                <View style={styles.LineStyle}></View>
                <TouchableOpacity style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:16, marginTop:16 }]}>
                    <Text style={[styles.TextStyle2, { marginLeft: 10 }]}>Term of Use</Text>
                    <FontAwesomeIcon icon={faChevronRight} size={15} color="#000" style={{ marginRight: 26 }} />
                </TouchableOpacity>
                <View style={styles.LineStyle}></View>
                <TouchableOpacity style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:16, marginTop:16 }]}>
                    <Text style={[styles.TextStyle2, { marginLeft: 10 }]}>Open source libraries</Text>
                    <FontAwesomeIcon icon={faChevronRight} size={15} color="#000" style={{ marginRight: 26 }} />
                </TouchableOpacity>
                <View style={styles.LineStyle}></View>
            </View>
    </View>
  )
}

export default AboutSreen

const styles = StyleSheet.create({
    LineStyle: {
        height: 1,
        backgroundColor: '#F1F1F1',
      },
    Container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    TextStyle2: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#2C2B2B',
        textAlign: 'center',
    },
    OptionContainer: {
        margin: 16,
        marginTop: 26,
        borderRadius: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
    },
})