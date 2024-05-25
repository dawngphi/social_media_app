// App.jsx
import {colors} from '@/theme';
import {Image, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

/*
  1. Create the config
*/
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  noti: ({text1, props}) => (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderRightWidth: 3,
        borderColor: colors.primaryColor,
      }}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        source={{uri: props.avatar}}
      />
      <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 10,width:'80%'}}>
        {text1}
      </Text>
    </View>
  ),
};
export const toastType = {
  success: 'success',
  error: 'error',
  noti: 'noti',
};
export default toastConfig;
