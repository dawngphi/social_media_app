import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface HeaderBarEditProfileProps {
    back?: string
    next?: string
    IconBackComponent?: React.ReactNode;
    IconNextComponent?: React.ReactNode;
}

const HeaderBarEditProfile:React.FC<HeaderBarEditProfileProps> = ({back, next, IconBackComponent, IconNextComponent}) => {
  return (
    <View style = {styles.Container}>
        <TouchableOpacity style = {styles.ButtonContainer}>
            {IconBackComponent}
            <Text style = {styles.TextStyle}>{back}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.ButtonContainer}>
            <Text style = {styles.TextStyle}>{next}</Text>
            {IconNextComponent}
        </TouchableOpacity>
    </View>
  )
}

export default HeaderBarEditProfile

const styles = StyleSheet.create({
    TextStyle:{
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#000',
    },
    ButtonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    Container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
})