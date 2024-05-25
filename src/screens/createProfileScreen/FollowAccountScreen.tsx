import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderBarEditProfile from '@/screens/createProfileScreen/component/HeaderBarEditProfile'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Search from '@/component/Search';
import UserItemCreate from '@/screens/createProfileScreen/component/UserItemCreate';
import ButtonBottom from '@/screens/createProfileScreen/component/ButtonBottom';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackEnum, LoginStackParamList } from '@/navigation/login';
import { useTranslation } from 'react-i18next';

const userFollow = [
    {
        id: 1,
        nameUser: 'bicenzo',
        fullName: 'bicenzo dep trai public',
        icontick: true,
        followingStatus: 'Follow',
        accountType: 'public',
        avatar: require('../../assets/images/cr7.png'),
    },
    {
        id: 2,
        nameUser: 'hoaiphap',
        fullName: 'tran hoai phap ',
        icontick: true,
        followingStatus: 'Follow',
        accountType: 'private',
        avatar: require('../../assets/images/nytao.png'),
    },
    {
        id: 3,
        nameUser: 'long',
        fullName: 'tran giang long',
        icontick: true,
        followingStatus: 'Follow',
        accountType: 'private',
        avatar: require('../../assets/images/messi.png'),
    },
    {
        id: 4,
        nameUser: 'phi',
        fullName: 'dang phi',
        icontick: true,
        followingStatus: 'Following',
        accountType: 'public',
        avatar: require('../../assets/images/avatar2.png'),
    },
    {
        id: 5,
        nameUser: 'thanh',
        fullName: 'van thanh',
        icontick: true,
        followingStatus: 'Following',
        accountType: 'public',
        avatar: require('../../assets/images/avatar3.png'),
    },
    {
        id: 5,
        nameUser: 'duy',
        fullName: 'dinh duy',
        icontick: true,
        followingStatus: 'Following',
        accountType: 'public',
        avatar: require('../../assets/images/avatar4.png'),
    },
]



const FollowAccountScreen = () => {
    const { t}  = useTranslation();
    const [listData, setListData] = useState<any[]>(userFollow);
    const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
    const handleNext = () => {
        navigation.navigate(LoginStackEnum.JoinVerses);
    }
    const handleBack = () => {
        navigation.goBack();
    }

    const follow = (id: any) => {
        const newListData = listData.map((user) => {
            if (user.id === id) {
                let newFollowingStatus = user.followingStatus;
                // Nếu tài khoản là public và trạng thái hiện tại là Follow hoặc following, đổi trạng thái.
                if (user.accountType === t('public')) {
                    newFollowingStatus = user.followingStatus === t('Follow') ? t('Following') : t('Follow');
                }
                // Nếu tài khoản là private và trạng thái hiện tại là Follow hoặc Requested, đổi trạng thái.
                else if (user.accountType === t('private')) {
                    newFollowingStatus = user.followingStatus === t('Follow') ? t('Requested') : t('Follow');
                }
                return {
                    ...user,
                    followingStatus: newFollowingStatus,
                };
            }
            return user;
        });
        setListData(newListData);
    };
    return (
        <View style={styles.Container}>
            <View>

                <HeaderBarEditProfile
                    back={t('Back')}
                    next={t('Next')}
                    IconBackComponent={<FontAwesomeIcon icon={faChevronLeft} size={15} color="#000" style={{ marginRight: 8 }} />}
                    IconNextComponent={<FontAwesomeIcon icon={faChevronRight} size={15} color="#000" style={{ marginLeft: 8 }} />} 
                    onPressBack={handleBack}
                    onPressNext={handleNext}/>
                <View style={styles.TitleStyle}>
                    <Text style={styles.TitleStyleTextFollow}>{t('Follow the accounts that')}</Text>
                    <Text style={[styles.TitleStyleTextFollow, { color: '#E693BF' }]}>{t('related to you?')}</Text>
                    <Text style={styles.TitleStyleTextHow}>{t('How it works')}</Text>
                </View>
                <View>
                    <Search />
                </View>
                <View>
                    {listData.map((item, index) => {
                        return <UserItemCreate
                            key={index}
                            nameUser={item.nameUser}
                            fullName={item.fullName}
                            icontick={item.icontick}
                            followingStatus={t(item.followingStatus)}
                            onPress={() => follow(item.id)}
                            avatar={item.avatar}
                        />
                    }
                    )}

                </View>

            </View>
            <ButtonBottom title={t('Follow All')} backgroundColor='#5E4EA0' color='#FFFFFF' />
        </View>
    )
}

export default FollowAccountScreen

const styles = StyleSheet.create({
    TitleStyleTextHow: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#767676',
        marginTop: 12,
    },
    TitleStyleTextFollow: {
        fontSize: 32,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#5E4EA0',
        textAlign: 'center',

    },
    TitleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 34,
    },
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        justifyContent: 'space-between',
    },
})