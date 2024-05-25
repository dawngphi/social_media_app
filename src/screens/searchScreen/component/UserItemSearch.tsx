import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icontick from '@/assets/icons/Icontick'
import IconStar from '@/assets/icons/IconStar'
import IconClose from '@/assets/icons/IconClose'
interface UserItemProps {
    nameUser: string,
    fullName: string,
    icontick?: boolean,
    avatar?: ImageProps,
    onPress?: () => void,
    followersCount?: number,
}

const UserItemSearch: React.FC<UserItemProps> = ({ nameUser, fullName, icontick, avatar, onPress, followersCount }) => {
    return (
        <TouchableOpacity style={styles.Container} onPress={onPress}>
            <View style={styles.UserNameContainer}>
                <Image style={styles.ImageAvatar} source={avatar ? {uri: avatar} : require('../../../assets/images/noAvatar.png')} />
                <View style={styles.FullNameContainer}>
                    <View style={styles.NameContainer}>
                        <Text style={styles.NameText}>{nameUser}</Text>
                        {icontick && <Icontick />}
                    </View>
                    <View style={styles.FullNameStyle}>
                        <Text style={styles.FullNameText} numberOfLines={1} ellipsizeMode="tail">{fullName}</Text>
                        <IconStar style={styles.IconStarStyle} />
                        <Text style={styles.FullNameText} numberOfLines={1} ellipsizeMode="tail">{followersCount} followers</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserItemSearch

const styles = StyleSheet.create({
    UserNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    IconStarStyle: {
        marginLeft: 4,
        marginRight: 4,
    },
    FullNameStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Cho phép nội dung co giãn linh hoạt
        marginRight: 10, // Đảm bảo có khoảng cách với IconClose
    },
    FullNameText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#767676',
        marginTop: 4,
        flexShrink: 1,
    },
    NameText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
        marginRight: 8,
    },
    Close: {
        alignItems: 'center',
        width: 26,
        height: 26,
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexShrink: 0,
    },
    FullNameContainer: {
        marginLeft: 12,
        width: '80%',
    },
    NameContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    Container: {
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