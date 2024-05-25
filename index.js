/**
 * @format
 */
// import gesture handle
import '@/language/i18n';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LogBox } from 'react-native';
import './src/components/Toast/Toast';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state. Check:'])
console.log('env',{
    env:process.env.FIREBASE_WEB_CLIENT_ID
})
GoogleSignin.configure({
    webClientId:process.env.FIREBASE_WEB_CLIENT_ID || ''
});
async function  setUpNotification(){
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log("*****",token);
}
try{
    setUpNotification();
}catch(e){
    console.log(e);
}
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
AppRegistry.registerComponent(appName, () => App);
