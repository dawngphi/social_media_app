import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ItemSettingProps {
    title: string,
    icon: React.ReactNode,
    color?: string,
    onPress?: () => void
}

const ItemSetting:React.FC<ItemSettingProps> = ({title, icon, color, onPress}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      {icon}
      <Text style = {[styles.TextStyle, {color: color}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ItemSetting

const styles = StyleSheet.create({
    TextStyle:{
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#2C2B2B',
        marginLeft: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        marginTop: 16,

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