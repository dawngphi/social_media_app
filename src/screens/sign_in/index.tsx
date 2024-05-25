import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {AppDispatch, useAppDispatch, useAppSelector} from '@/redux/store';
import {useLogger} from '@/utils';
import {fetchUserById} from '@/redux/action';
import {signInWithGoole} from './components/sign_in_google';
import LinearGradient from 'react-native-linear-gradient';
import IconGoogle from '@/assets/icons/IconGoogle';
import IconFacebook from '@/assets/icons/IconFacebook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackParamList, LoginStackEnum} from '@/navigation/login';
import {userInfoSelector} from '@/redux/test/userStore';
import {colors} from '@/theme';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const dispatch: AppDispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.app);
  const user = useAppSelector(userInfoSelector);
  useEffect(() => {
    dispatch(fetchUserById(123));
  }, []);
  const {t} = useTranslation();
  return (
    <View style={styles.LoginContainer}>
      <View style={styles.TitleContainer}>
        <LinearGradient colors={['#5E4EA0', '#E693BF']} style={styles.gradient}>
          <Text style={styles.titleStyle}>
            Everyone loves <Text style={{color: '#E693BF'}}>VNPIC</Text>.
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.ButtonLoginContainer}>
        <TouchableOpacity
          style={styles.ButtonLogin}
          onPress={() => signInWithGoole(navigation, dispatch)}>
          <Text style={styles.ButtonLoginTitle}>{t('Login with Google')}</Text>
          <IconGoogle />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonLogin2}
          onPress={() => navigation.navigate(LoginStackEnum.SignInScren)}>
          <Text style={styles.ButtonLoginTitle2}>
            {t('Sign in with password')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ButtonLoginTitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: 'black',
    fontWeight: '400',
  },
  ButtonLogin: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  ButtonLoginContainer: {
    marginTop: 150,
  },
  titleStyle: {
    fontSize: 36,
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: '700',
    width: 217,
    height: 84,
    marginTop: 94,
    marginLeft: 16,
  },
  gradient: {
    flex: 1,
  },
  TitleContainer: {
    width: '100%',
    height: '40%',
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    overflow: 'hidden',
  },
  LoginContainer: {
    flex: 1,
  },
  ButtonLogin2: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6600',
    backgroundColor: '#FF6600',
    paddingHorizontal: 24,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  ButtonLoginTitle2: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: '700',
    height: 33,
    marginTop: 7,
  },
});

export default LoginScreen;
