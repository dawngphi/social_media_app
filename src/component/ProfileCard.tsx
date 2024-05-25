import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const ProfileCard = () => {
  return (
    <View style = {styles.Container}>
        <View style = {styles.NameContainer}>
            <View style = {styles.NameTitleContainer}>
                <Text style = {styles.NameTitle}>Name</Text>
                <View style = {styles.TextInputContainer}>
                    <FontAwesomeIcon icon={ faUser } size={ 15 } color="#000" />
                    <TextInput placeholder="+ Name" style = {styles.TextInputStyle}/>
                </View>
            </View>
            <TouchableOpacity style = {styles.ButtonCamera}>
                <FontAwesomeIcon icon={ faCamera } size={ 20 } color="#000" />
            </TouchableOpacity>
        </View>
        <View style = {styles.line}></View>
        <View style = {styles.NameContainer}>
            <View style = {styles.NameTitleContainer}>
                <Text style = {styles.NameTitle}>Bio</Text>
                    <TextInput placeholder="+ Bio" style = {styles.TextInputStyle}/>
            </View>
        </View>
        <View style = {styles.line}></View>
        <View style = {styles.NameContainer}>
            <View style = {styles.NameTitleContainer}>
                <Text style = {styles.NameTitle}>Link</Text>
                    <TextInput placeholder="+ Link" style = {styles.TextInputStyle}/>
            </View>
        </View>
        <View style = {styles.line}></View>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
    TextInputStyle:{
        color: '#000',
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '400',
        marginLeft: 5,
    },
    line:{
        width: '80%',
        height: 1,
        backgroundColor: '#D9D9D9',
        marginBottom: 20,
    },
    ButtonCamera:{
        borderRadius: 50,
        backgroundColor: '#E3E3E3',
        padding: 15,
    },
    TextInputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    NameTitle:{
        fontSize:14,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#000',
    },
    NameTitleContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    NameContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    Container:{
        backgroundColor: 'white',
        borderRadius: 16,
        width: '100%',
        marginTop: 82,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 26,
        padding:26,
    }
})