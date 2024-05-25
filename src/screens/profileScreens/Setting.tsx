import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderBar from './component/HeaderBar'
import ButtonSwitch from './component/ButtonSwitch'
import IconFollow from '@/assets/icons/IconFollow'
import IconAbout from '@/assets/icons/IconAbout'
import IconNotification from '@/assets/icons/IconNotification'
import IconAccount from '@/assets/icons/IconAccount'
import IconHelp from '@/assets/icons/IconHelp'
import IconPrivacy from '@/assets/icons/IconPrivacy'
import ItemSetting from './component/ItemSetting'
import IconLogout from '@/assets/icons/IconLogout'
import AccountScreen from './AccountScreen'
import PrivacyScreen from './PrivacyScreen'
import { useNavigation } from '@react-navigation/native'
import { AppStackNames, RootStackParamList } from '@/navigation/config'
import { ProfileNavigatorProps, ProfileStackNames } from '@/navigation/ProfileNavigator/config'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { t } from 'i18next'
import reduxStorage from '@/redux/store/reduxStorage'
import { setLoading } from '@/redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { localStorage } from '@/utils'
import {AppDispatch} from '@/redux/store';
import {setUser} from '@/redux/slice/user.slice';
import { LoginStackEnum, LoginStackParamList } from '@/navigation/login'
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const dataOptionSetting = [
    {
        id: 1,
        title: 'Follow and invite friends',
        icon: <IconFollow />,
        screenName: "FollowAndFriendsScreen"
    },
    {
        id: 2,
        title: 'Notification',
        icon: <IconNotification />,
        screenName: "NotificationScreen"
    },
    {
        id: 3,
        title: 'Privacy',
        icon: <IconPrivacy />,
        screenName: "PrivacyScreen"
    },
    {
        id: 4,
        title: 'Account',
        icon: <IconAccount />,
        screenName: "AccountScreen"
    },
    {
        id: 5,
        title: 'Change password',
        icon: <IconHelp />,
        screenName: "HelpScreen"
    },
    {
        id: 6,
        title: 'About',
        icon: <IconAbout />,
        screenName: "AboutSreen"
    },
]


const Setting = () => {
    const navigation = useNavigation<any>();
    const navigationLogin = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const handleLogout = async () => {
        dispatch(setLoading(true));
        try {
            await GoogleSignin.signOut();
            localStorage.delete('userInfo')
            localStorage.delete('FCM')
            dispatch(setUser({
                _id: "",
                userName: "",
                fullName: "",
                avatar: "",
                dob: "",
                googleId: "",
                links: [],
                role: 0,
                following_status: 0,
                account_type: 0,
                fcm_token: "",
                createdAt: "",
                updatedAt: "",
                __v: 0,
                accessToken: "",
                refreshToken: "",
                isFirstTimeLogin: false,
            }));
            navigation.reset({
                index: 0,
                routes: [{name: AppStackNames.LoginNavigation}],
            });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <View style={styles.Container}>
            <HeaderBar title={t('Settings')} />
            <ButtonSwitch title={t('Language')} textOff='Eng' textOn='Vie' />
            <View style = {styles.ListStyle}>
                {dataOptionSetting.map((item, index) => (
                    <ItemSetting 
                        key={index} 
                        title={t(item.title)} 
                        icon={item.icon} 
                        color='#2C2B2B'
                        onPress={() => navigation.navigate(item.screenName)}/>
                ))}
            </View>
            <View style = {styles.LogoutContainer}>
                <ItemSetting onPress={handleLogout} title={t('Log out')} icon={<IconLogout/>} color='#5E4EA0'/>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    LogoutContainer:{
        marginTop: 26,
    },
    ListStyle:{
        marginTop: 26,
    },
    Container: {
        flex: 1,
    },
})