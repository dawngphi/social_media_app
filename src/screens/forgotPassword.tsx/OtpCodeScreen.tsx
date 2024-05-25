import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/slice/app.slice';
import { RootState } from '@/redux/store';

import HeaderBarEditProfile from '@/screens/createProfileScreen/component/HeaderBarEditProfile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import OtpInput from './componnents/OtpInput';
import TextInputForgot from './componnents/TextInputForgot';
import Footer from './componnents/Footer';
import ButtonBottom from '@/screens/createProfileScreen/component/ButtonBottom';
import { LoginStackParamList, LoginStackEnum } from '@/navigation/login';
import HeaderForgot from './componnents/header';
import AxiosInstance from '@/network/axiosInstance';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { colors } from '@/theme';
import CustomToast from '@/components/Toast/CutomToast';








const OtpCodeScreen = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetFlag, setResetFlag] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const route = useRoute<RouteProp<LoginStackParamList, LoginStackEnum.ForgotPass>>();
  const emailForgot = route.params?.email;

  const handleVerifyOTP = async () => {
    const email = emailForgot;
    const Axios = AxiosInstance();
    if (!newPassword && !confirmPassword) {
      CustomToast({
        type: 'error',
        message: t('Please enter new password and confirm password.'),
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      CustomToast({
        type: 'error',
        message: t('Password and confirm password do not match.'),
      });
      return;
    }
    dispatch(setLoading(true));
    try {
      const response: any = await Axios.post('auth/change_pass_otp', {
        email,
        otp: otp,
        newPass: newPassword,
      });

      if (response.status === 'success') {
        const data = response.data;
        navigation.navigate(LoginStackEnum.SignInScren);
      } else {
        CustomToast({
          type: 'error',
          message: response.message || 'Failed to verify OTP.',
        });
      }
    } catch (error) {
      
    } finally {
      dispatch(setLoading(false));
    }
  };
  const resendOTP = async () => {
    const email = emailForgot;
    setOtp('');
    try {
      const response = await fetch(
        'https://sever-social-media-app.onrender.com/auth/send-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return;
      }

      const data = await response.json();
      if (response.ok) {
      }
      else {
      }
      setResetFlag(true);
    } catch (error) {

    }
  };

  useEffect(() => {
    if (resetFlag) {
      setResetFlag(false);
    }
  }, [resetFlag]);
  const toastConfig = {
    success: (props: any) => (
      <View style={styles.CustumToast}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            alignSelf: 'center',
            fontWeight: '600',
          }}>
          {props.text1}
        </Text>
      </View>
    ),
    error: (props: any) => (
      <View style={styles.CustumToast2}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '600',
            alignSelf: 'center',
            marginStart: 10,
          }}>
          {props.text1}
        </Text>
      </View>
    ),
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
            style={{ marginRight: 8 }}
          />
        }
        onPressBack={() => navigation.goBack()}
      />
      <HeaderForgot
        title={t("OTP code verification 🔐")}
        title2={t("We have sent an OTP code to your email. Enter the code below to verify your account.")}
      />
      <OtpInput onOtpComplete={setOtp} resetFlag={resetFlag} />
      <Footer resendOTP={resendOTP} />
      <TextInputForgot
        placeholder={t('New Password')}
        title={t('New Password')}
        showIcon
        iconType="password"
        onChangeText={(text: string) => setNewPassword(text)}
        value={newPassword}
      />
      <TextInputForgot
        placeholder={t("Confirm Password")}
        title={t("Confirm Password")}
        showIcon
        iconType="password"
        onChangeText={(text: string) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <View
        style={{
          marginTop: 180,
          display: 'flex',
        }}>
        <ButtonBottom
          title={t('Continue')}
          backgroundColor="#5E4EA0"
          color="#FFFFFF"
          onPress={handleVerifyOTP}>
          {isLoading && (
            <FontAwesomeIcon icon={faSpinner} size={24} color="#FFFFFF" />
          )}
        </ButtonBottom>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  CustumToast2: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    width: 356,
    height: 70,
    borderLeftColor: colors.red,
    borderRightColor: colors.red,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    justifyContent: 'center',
  },
  CustumToast: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    width: 356,
    height: 70,
    borderLeftColor: colors.purple,
    borderLeftWidth: 4,
    justifyContent: 'center',
    borderRightColor: colors.purple,
    borderRightWidth: 4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});

export default OtpCodeScreen;
