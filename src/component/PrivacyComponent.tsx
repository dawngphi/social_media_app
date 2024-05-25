import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


interface PrivacyComponentProps {
    TitleStatus: string,
    TitleDetail: string,
    borderColor: string,
    IconComponent?: React.ReactNode;
    isSelected: boolean;
}

const PrivacyComponent: React.FC<PrivacyComponentProps> = ({TitleStatus, TitleDetail, borderColor, IconComponent, isSelected}) => {
    
  return (
    <View style = {[styles.Container, {borderColor: borderColor, borderWidth: isSelected ? 2 : 1}]} >
        <View style = {styles.TitleStatusContainer}>
            <Text style = {styles.TitleStatus}>{TitleStatus}</Text>
            {IconComponent}
        </View>
        <Text style = {styles.TitleDetail}>{TitleDetail}</Text>
    </View>
  )
}

export default PrivacyComponent

const styles = StyleSheet.create({
   
    TitleDetail:{
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#3F3E3E',
        width: 255,
    },
    TitleStatusContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    TitleStatus:{
        fontSize:14,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#000',
    },
    Container:{
        marginBottom: 16,
        paddingHorizontal: 24,
        paddingVertical: 26,
        borderRadius: 16,
        borderWidth: 1,
        
        // borderColor: '#C8C8C8',
    },
})