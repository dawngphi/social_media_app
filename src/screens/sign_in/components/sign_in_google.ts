import {ANSI_COLOR_CODES, useLogger} from '@/utils';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const logger = useLogger('signInWithGoole', ANSI_COLOR_CODES.fgBlue);
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackParamList, LoginStackEnum} from '@/navigation/login';
import messaging from '@react-native-firebase/messaging';
import AxiosInstance from '@/network/axiosInstance';
import {localStorage} from '@/utils';
import {setLoading} from '@/redux/slice/app.slice';
import {
  HomeStackNames,
  HomeStackParamList,
} from '@/navigation/HomeNavigator/config';
import {ILogin, loginWithGoogle} from '@/network';
import {setUser} from '@/redux/slice/user.slice';
import {AppDispatch} from '@/redux/store';
import {AppStackNames} from '@/navigation/config';

export const signInWithGoole = async (
  navigation: any,
  dispatch: AppDispatch,
) => {
  dispatch(setLoading(true));
  const axios = AxiosInstance();

  try {
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();
    const token_FCM = await setUpNotification();
    localStorage.set('FCM', token_FCM);
    console.log('idToken', token_FCM);
    try {
      const response: any = await loginWithGoogle({
        idToken,
        fcm_token: token_FCM,
      });

      dispatch(setUser(response.data));
      localStorage.set('userInfo', JSON.stringify(response.data));

      console.log('response', response.data);
      if (!response.data.isFirstLogin) {
        // reset navigation
        navigation.reset({
          index: 0,
          routes: [{name: AppStackNames.HomeBottomTab}],
        });
        return;
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: LoginStackEnum.CreateProfileScreen}],
        });
      }
    } catch (error) {
      console.log(error, 'ádasdas');
    } finally {
      dispatch(setLoading(false));
    }
    // const data: ILogin = {
    //   idToken: idToken,
    //   fcm_token: token_FCM,
    // }
    // reduxLoginWithGoogle(data);

    return idToken;
  } catch (error) {
    logger({error});
    dispatch(setLoading(false));
  }
};
async function setUpNotification() {
  await messaging().registerDeviceForRemoteMessages();
  const token_FCM = await messaging().getToken();
  localStorage.set('FCM', token_FCM);
  return token_FCM;
}
try {
  setUpNotification();
} catch (e) {
  console.log(e);
}
