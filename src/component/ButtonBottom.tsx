import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonBottomProps {
  title: string
  backgroundColor?: string
  color?: string
  onPress?: () => void
}

const ButtonBottom: React.FC<ButtonBottomProps> = ({title, backgroundColor, color ,onPress}) =>{
  return (
    <View >
      <TouchableOpacity onPress={onPress} style = {[styles.Container, {backgroundColor: backgroundColor}]}>
        <Text style ={[styles.TitleStyle, {color:color}]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonBottom

const styles = StyleSheet.create({
  TitleStyle:{
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  Container:{
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#5E4EA0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})