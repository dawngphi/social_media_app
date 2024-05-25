import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSwitch from '../CustomSwitch';

interface ButtonSwitchProps {
    title: string,
    textOn?: string;
    textOff?: string;
    iconOn?: React.ReactNode;
    iconOff?: React.ReactNode;
    onToggle?: (isActive: boolean) => void;
}

const ButtonSwitch: React.FC<ButtonSwitchProps> = ({title, textOn, textOff, iconOn, iconOff, onToggle}) => {
  
  return (
    <View style = {styles.Container}>
      <Text style = {styles.TextStyle}>{title}</Text>
      <CustomSwitch textOn = {textOn} textOff = {textOff} iconOn = {iconOn} iconOff = {iconOff} onValueChange={onToggle} />
    </View>
  )
}

export default ButtonSwitch

const styles = StyleSheet.create({
    TextStyle:{
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
    },
    Container:{
        marginTop: 26,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#fff',

        // iOS bóng đổ
        shadowColor: "#000",
        
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        // Android bóng đổ
        elevation: 5,
    },
})