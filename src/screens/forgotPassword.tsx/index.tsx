import {Alert, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import HeaderBarEditProfile from '@/screens/createProfileScreen/component/HeaderBarEditProfile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackEnum, LoginStackParamList} from '@/navigation/login';
import HeaderForgot from './componnents/header';
import ButtonBottom from '@/screens/createProfileScreen/component/ButtonBottom';
import AxiosInstance from '@/network/axiosInstance';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '@/redux/slice/app.slice';
import {RootState} from '@/redux/store';
import TextInputForgot from './componnents/TextInputForgot';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  const handleSendOTP = async (email : any) => {
    dispatch(setLoading(true));
    try {
      const response: any = await AxiosInstance().post('auth/send-otp', {
        email,
      });

      if (response.status === 'Otp sent') {
        navigation.navigate(LoginStackEnum.OtpCodeScreen,{email});
      } else {
        Alert.alert('Error sending OTP:' + response);
      }
    } catch (error) {
      console.log('Error sending OTP:', error);
      Alert.alert(
        'Error',
        'An error occurred while sending OTP. Please try again later.',
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBarEditProfile
        back={t('Back')}
        IconBackComponent={
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={15}
            color="#000"
            style={{marginRight: 8}}
          />
        }
        onPressBack={() => navigation.goBack()}
      />
      <HeaderForgot
        title="Rest your password 🔑"
        title2="Please enter your email and we wil send on OTP code in the next step to reset your password"
      />
      <TextInputForgot
        style={styles.Input}
        placeholder="Email"
        title="Email"
        showIcon
        iconType="email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{marginTop: 450}}>
        <ButtonBottom
          title={t('Continue')}
          backgroundColor="#FF6600"
          color="#FFFFFF"
          onPress={() => handleSendOTP(email)}>
          {isLoading && (
            <FontAwesomeIcon icon={faSpinner} size={24} color="#FFFFFF" />
          )}
        </ButtonBottom>
      </View>
      
    </View>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  Input: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
