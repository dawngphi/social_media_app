import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import HeaderBarEditProfile from '@/screens/createProfileScreen/component/HeaderBarEditProfile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import TextInputSignIn from './components/TextInput';
import Checkbox2 from './components/Checkbox';
import TextSignUp from './components/TextSignUp';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackEnum, LoginStackParamList} from '@/navigation/login';
import {SelectList} from 'react-native-dropdown-select-list';
import {faVenusMars} from '@fortawesome/free-solid-svg-icons';
import CustomToast from '@/components/Toast/CutomToast';
import { useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {colors} from '@/theme';
import {registerUser} from '@/network/callAPI';
import {AppStackNames} from '@/navigation/config';
import {useAppDispatch} from '@/redux/store';
import {setUser} from '@/redux/slice/user.slice';
import {localStorage} from '@/utils';
import {setLoading} from '@/redux';

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    selectedGender: Yup.string().required('Gender selection is required'),
    fullName: Yup.string().required('Full name is required'),
  });
  const {t} = useTranslation();
  const navigation2 = useNavigation();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });
  const [isChecked, setIsChecked] = useState(false);

  const gender = [
    {key: '0', value: t('Male')},
    {key: '1', value: t('Female')},
    {key: '2', value: t('Other')},
  ];

  const handleSignUp = async (data: any) => {
    dispatch(setLoading(true));
    const {email, password, selectedGender} = data;
    try {
      const response: any = await registerUser(
        email,
        password,
        selectedGender,
        1,
      );
      if (response?.status === 'success') {
        // console.log('Register success:', response.data);
        CustomToast({
          type: 'success',
          message: t("Sign up success 🎉"),
        });
        navigation.navigate(LoginStackEnum.SignInScren);
        } else {
          // console.log('Sign up failed:', response);
          CustomToast({
            type: 'error',
            message: t('Sign up failed'),
          });
        }
      }
     catch (error) {
        console.log('Sign up error:', error);
      // console.log('Sign up error:', error);
      CustomToast({
        type: 'error',
        message: t('Sign up failed'),
      });
    }finally {
      dispatch(setLoading(false));
    }
  };
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
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
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
      <Text style={styles.welcome}>{t("Creact account")} </Text>
      <Text style={styles.please}>
        {t("Join our community and personalize your news experience")}
      </Text>
      <TextInputSignIn
        style={[styles.input, errors.email ? styles.inputError : null]}
        {...register('email')}
        placeholder="Email"
        title="Email"
        showIcon
        iconType="email"
        onChangeText={(text: string) => {
          setValue('email', text, {shouldValidate: true});
        }}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <TextInputSignIn
        placeholder={t('Full name')}
        title={t('Full name')}
        showIcon
        iconType="name"
        style={[styles.input, errors.fullName ? styles.inputError : null]}
        {...register('fullName')}
        onChangeText={(text: string) => {
          setValue('fullName', text, {shouldValidate: true});
        }}
      />
      {errors.fullName && (
        <Text style={styles.errorText}>{errors.fullName.message}</Text>
      )}
      <Text
        style={{
          color: colors.black,
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 15,
        }}>
        {t("Gender")}
      </Text>
      <SelectList
        data={gender}
        placeholder={t("Select gender")}
        boxStyles={{
          width: 370,
          height: 60,
          backgroundColor: colors.greyLight,
          borderWidth: 0,
          marginTop: 10,
        }}
        inputStyles={{marginTop: 10, marginStart: 20}}
        arrowicon={
          <FontAwesomeIcon
            icon={faVenusMars}
            size={15}
            color="#000"
            style={styles.icon}
          />
        }
        search={false}
        dropdownStyles={{
          width: 370,
          height: 130,
          backgroundColor: colors.greyLight,
          borderWidth: 0,
        }}
        setSelected={(item: any) => {
          setValue('selectedGender', item, {shouldValidate: true});
        }}
      />
      {errors.selectedGender && (
        <Text style={styles.errorText}>{errors.selectedGender.message}</Text>
      )}
      <TextInputSignIn
        placeholder={t('Password')}
        title={t('Password')}
        showIcon
        iconType="password"
        onChangeText={(text: string) => {
          setValue('password', text, {shouldValidate: true});
        }}
        style={[styles.input, errors.password ? styles.inputError : null]}
        {...register('password')}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <TextInputSignIn
        placeholder={t('Confirm Password')}
        title={t('Confirm Password')}
        showIcon
        iconType="password"
        style={[
          styles.input,
          errors.confirmPassword ? styles.inputError : null,
        ]}
        {...register('password')}
        onChangeText={(text: string) => {
          setValue('confirmPassword', text, {shouldValidate: true});
        }}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}
      <Checkbox2
        label={t("I agree to Newsline")}
        onCheckChange={newCheckState => setIsChecked(newCheckState)}
      />
      <View
        style={{
          width: 370,
          height: 1,
          borderColor: colors.gray,
          borderWidth: 0.2,
          marginTop: 30,
        }}
      />
      <TextSignUp />
      <View style={{marginTop: 30}}>
        <TouchableOpacity
          disabled={!isChecked}
          onPress={handleSubmit(handleSignUp)}
          style={[
            styles.btn,
            {backgroundColor: isChecked ? '#FF6600' : '#A9A9A9'},
          ]}>
          <Text style={styles.text}>{t('Sign up')}</Text>
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
    </ScrollView>
  );
};

export default SignUpScreen;

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
  input: {},
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  icon: {
    position: 'absolute',
    top: 24,
    left: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#5E4EA0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  please: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 8,
  },
  welcome: {
    fontSize: 35,
    fontWeight: '700',
    color: colors.black,
    marginTop: 24,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});
