import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@/screens';
import CreateProfileScreen from '@/screens/createProfileScreen/CreateProfileScreen';
import EditBioScreen from '@/screens/createProfileScreen/EditBioScreen';
import FollowAccountScreen from '@/screens/createProfileScreen/FollowAccountScreen';
import JoinVerses from '@/screens/createProfileScreen/JoinVerses';
import {NavigationContainer} from '@react-navigation/native';
import EditLinkScreen from '@/screens/createProfileScreen/EditLinkScreen';
import PrivacyScreen from '@/screens/profileScreens/PrivacyScreen';
import PrivacyProfileScreen from '@/screens/createProfileScreen/PrivacyProfileScreen';
import SignUpScreen from '@/screens/sign_inScreen';
import SigninScreen from '@/screens/sign_up';
import ForgotPass from '@/screens/forgotPassword.tsx';
import OtpCodeScreen from '@/screens/forgotPassword.tsx/OtpCodeScreen';
import CreactNewPassScreen from '@/screens/forgotPassword.tsx/CreactNewPassScreen';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export enum LoginStackEnum {
  Login = 'Login',
  CreateProfileScreen = 'CreateProfileScreen',
  EditBioScreen = 'EditBioScreen',
  EditLinkScreen = 'EditLinkScreen',
  PrivacyProfileScreen = 'PrivacyProfileScreen',
  FollowAccountScreen = 'FollowAccountScreen',
  JoinVerses = 'JoinVerses',
  SignUpScreen = 'SignUpScreen',
  SignInScren = 'SignInScreen',
  ForgotPass = 'ForgotPass',
  OtpCodeScreen = 'OtpCodeScreen',
  CreactNewPassScreen = 'CreactNewPassScreen',
}

export type LoginStackParamList = {
  [LoginStackEnum.Login]: undefined;
  [LoginStackEnum.CreateProfileScreen]: undefined;
  [LoginStackEnum.EditBioScreen]: {onSaveBio?: (newBio: string) => void};
  [LoginStackEnum.EditLinkScreen]: {onSaveLink?: (newLink: string) => void};
  [LoginStackEnum.PrivacyProfileScreen]: undefined;
  [LoginStackEnum.FollowAccountScreen]: undefined;
  [LoginStackEnum.JoinVerses]: undefined;
  [LoginStackEnum.SignUpScreen]: undefined;
  [LoginStackEnum.SignInScren]: undefined;
  [LoginStackEnum.ForgotPass]: {email: string};
  [LoginStackEnum.OtpCodeScreen]: {email: string};
  [LoginStackEnum.CreactNewPassScreen]: undefined;
};

interface LoginProps {
  name: LoginStackEnum;
  component: () => React.JSX.Element;
  options?: any;
}

export const LoginStack: LoginProps[] = [
  {
    name: LoginStackEnum.Login,
    component: LoginScreen,
    options: {},
  },
  {
    name: LoginStackEnum.CreateProfileScreen,
    component: CreateProfileScreen,
    options: {},
  },
  {
    name: LoginStackEnum.EditBioScreen,
    component: EditBioScreen,
    options: {},
  },
  {
    name: LoginStackEnum.EditLinkScreen,
    component: EditLinkScreen,
    options: {},
  },
  {
    name: LoginStackEnum.PrivacyProfileScreen,
    component: PrivacyProfileScreen,
    options: {},
  },
  {
    name: LoginStackEnum.FollowAccountScreen,
    component: FollowAccountScreen,
    options: {},
  },
  {
    name: LoginStackEnum.JoinVerses,
    component: JoinVerses,
    options: {},
  },
  {
    name: LoginStackEnum.SignUpScreen,
    component: SignUpScreen,
    options: {},
  },
  {
    name: LoginStackEnum.SignInScren,
    component: SigninScreen,
    options: {},
  },
  {
    name: LoginStackEnum.ForgotPass,
    component: ForgotPass,
    options: {},
  },
  {
    name: LoginStackEnum.OtpCodeScreen,
    component: OtpCodeScreen,
    options: {},
  },
  {
    name: LoginStackEnum.CreactNewPassScreen,
    component: CreactNewPassScreen,
    options: {},
  },
];

const LoginNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {LoginStack.map((stack, index) => (
        <Stack.Screen
          key={index}
          name={stack.name}
          component={stack.component}
          options={stack.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default LoginNavigation;

const styles = StyleSheet.create({});
