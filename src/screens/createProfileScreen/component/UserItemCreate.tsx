import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icontick from '@/assets/icons/Icontick'

interface UserItemProps {
    nameUser: string,
    fullName: string,
    icontick?: boolean,
    avatar: ImageProps,
     followingStatus: string,
     onPress?: () => void
}

const UserItemCreate:React.FC<UserItemProps> = ({nameUser, fullName, icontick,followingStatus, onPress, avatar }) => {
    const textColor = followingStatus === 'Follow' ? '#000' : '#C8C8C8';
  return (
    <View style = {styles.Container}>
      <Image style = {styles.ImageAvatar} source={avatar} />
      <View style = {styles.FullNameContainer}>
        <View style = {styles.NameContainer}>
            <Text style = {styles.NameText}>{nameUser}</Text>
            <Icontick/>
        </View>
        <Text style = {styles.FullNameText}>{fullName}</Text>
      </View>
      <View>
        <TouchableOpacity style = {styles.ButtonFollow} onPress={onPress}>
            <Text style={[styles.TextFollow, {color: textColor} ]}>{followingStatus}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserItemCreate

const styles = StyleSheet.create({
    TextFollow:{
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '700',
    },
    FullNameText:{
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#767676',
        marginTop: 4,
    },
    NameText:{
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
        marginRight: 8,
    },
    ButtonFollow:{
        alignItems: 'center',
        width: 88,
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C8C8C8',
    },
    FullNameContainer:{
        marginLeft:12,
        width: '61%',
        
    },
    NameContainer:{
        flexDirection: 'row',
        alignItems: 'center',

    },
    Container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    ImageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 60,
        
    },
})