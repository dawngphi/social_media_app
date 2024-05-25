import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBarEditProfile from '@/screens/createProfileScreen/component/HeaderBarEditProfile'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackParamList } from '@/navigation/login';
import HeaderForgot from './componnents/header';
import TextInputSignIn2 from '@/screens/sign_up/components/TextInput';
import ButtonBottom from '@/screens/createProfileScreen/component/ButtonBottom';


const CreactNewPassScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
    return (
        <View style={styles.container}>
            <HeaderBarEditProfile
                back={t('Back')}
                IconBackComponent={<FontAwesomeIcon icon={faChevronLeft} size={15} color="#000" style={{ marginRight: 8 }} />}
                onPressBack={() => navigation.goBack()}
            />
            <HeaderForgot title='Create new password 🔒'
                title2='Creact your new password. If you forget it. then you have to do forgot password'
            />
            <TextInputSignIn2 placeholder="Password" title="New Password" showIcon iconType='password' />
            <TextInputSignIn2 placeholder="Confirm Password" title="Confirm New Password" showIcon iconType='password' />
            <View style={{ marginTop: 340 }}>
                <ButtonBottom title={t('Continue')} backgroundColor='#5E4EA0' color='#FFFFFF' onPress={() => ""} />
            </View>
        </View>
    )
}

export default CreactNewPassScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
})