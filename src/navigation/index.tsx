import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackNames, AppStacks, RootStackParamList } from "@/navigation/config";
import { LoadingModal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import i18n from "@/language/i18n";
import { localStorage } from "@/utils";
import { PermissionsAndroid } from "react-native";
import messaging from '@react-native-firebase/messaging';
import CustomToast, { ShowNoti } from "@/components/Toast/CutomToast";
import Toast from "react-native-toast-message";
import { toastType } from "@/components/Toast/Toast";
import { fetchNoti } from "@/redux/action/newfeed.action";
  

const useAsynsLanguage = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (!remoteMessage.data) {
        CustomToast({type: 'success', message: remoteMessage.notification?.body});
      } else {
        CustomToast({type: 'success', message: remoteMessage.notification?.body});
      }
      dispatch(fetchNoti());
    });
    return unsubscribe;
  }, []);
  const language = useAppSelector(state => state.language.language);
  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
};
console.log(i18n.language,"jkdasjkdakjsdkjadja");
export default function AppNavigator() {
  const AppStack = createNativeStackNavigator<RootStackParamList>();
  const {isLoading} = useAppSelector(state => state.app);
  const useInfo = localStorage.getString('userInfo');
  useAsynsLanguage();
  return (
    <>
      <LoadingModal visible={isLoading} />
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName={
            useInfo
              ? AppStackNames.HomeBottomTab
              : AppStackNames.LoginNavigation
          }
          screenOptions={{
            headerShown: false,
          }}>
          {AppStacks.map((stack, index) => {
            return (
              <AppStack.Screen
                key={index}
                name={stack.name}
                component={stack.component}
                options={stack.options}
              />
            );
          })}
        </AppStack.Navigator>
      </NavigationContainer>
    </>
  );
}
