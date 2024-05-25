import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Icontick from '@/assets/icons/Icontick'
import { useTranslation } from 'react-i18next'
import { set } from 'react-hook-form'
import AxiosInstance from '@/network/axiosInstance'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/slice/app.slice'
import { useIsFocused } from '@react-navigation/native'

interface UserItemProps {
    id?: string,
    nameUser?: string,
    fullName?: string,
    icontick?: boolean,
    avatar?: string,
    followingStatus?: (isFollow: boolean) => void;
    onPress?: () => void
}



const UserItem: React.FC<UserItemProps> = ({ id, nameUser, fullName, followingStatus, onPress, avatar }) => {
    ;
    
    console.log(followingStatus);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [follow, setFollow] = useState('')
    const isFocused = useIsFocused();
    const textColor = follow === 'Follow' ? '#000' : '#C8C8C8';
    useEffect(() => {
        if (isFocused) {
            if (followingStatus) {
                setFollow('Un Follow');
            } else {
                setFollow('Follow');
            }
        }
    }, [followingStatus, isFocused]);


    const onPressFollow = async () => {
        try {
            dispatch(setLoading(true));
            const response = await AxiosInstance().patch(`/user/follow/${id}`);
            console.log(response);
            setFollow(follow === 'Follow' ? 'Un Follow' : 'Follow');
            if (followingStatus) {
                followingStatus(follow === 'Follow');
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    console.log(followingStatus, textColor);
    return (
        <View style={styles.Container} >
            <TouchableOpacity onPress={onPress} style={styles.UserInforContainer}>
                <Image style={styles.ImageAvatar} source={{uri: avatar}} />
                <View style={styles.FullNameContainer}>
                    <View style={styles.NameContainer}>
                        <Text style={styles.NameText}>{nameUser}</Text>
                    </View>
                    <Text style={styles.FullNameText}>{fullName}</Text>
                </View>
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.ButtonFollow} onPress={onPressFollow}>
                    <Text style={[styles.TextFollow, { color: textColor }]}>{follow}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserItem

const styles = StyleSheet.create({
    UserInforContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    UserNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    TextFollow: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '700',
        paddingVertical: 4,
    },
    FullNameText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#767676',
        marginTop: 4,
    },
    NameText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
        marginRight: 8,
    },
    ButtonFollow: {
        alignItems: 'center',
        width: 100,
        justifyContent: 'center',
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C8C8C8',
    },
    FullNameContainer: {
        marginLeft: 12,
        width: '61%',

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