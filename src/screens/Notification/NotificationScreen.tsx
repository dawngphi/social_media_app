import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import IconStar2 from '@/assets/icons/IconStar2';
import IconShare from '@/assets/icons/IconShare';
import IconFollow2 from '@/assets/icons/IconFollow2';
import IconComment2 from '@/assets/icons/IconComment2';
import { formatPostTime } from '@/utils/time';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useAppSelector } from '@/redux/store';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AppStackNames } from '@/navigation/config';
import { HomeStackNames } from '@/navigation/HomeNavigator/config';
import i18n from '@/language/i18n';
const Tab = createMaterialTopTabNavigator();
const data = [
  {
    _id: '66339100f26602a8d6a64f49',
    user: '66177bcbc3728898cc04df2d',
    content: 'TAO LA TAO đã theo dõi bạn',
    type: 4,
    isRead: false,
    data: {
      id: '66322ce7f62d0d9b049a893c',
      image:
        'https://i.pinimg.com/236x/4b/f3/2a/4bf32ae5f06735b1d83174e9c90a385b.jpg',
    },
    createdAt: '2024-05-02T13:11:28.334Z',
    updatedAt: '2024-05-02T13:11:28.334Z',
    __v: 0,
  },
  {
    _id: '663390f8f26602a8d6a64f3a',
    user: '66177bcbc3728898cc04df2d',
    content: 'TAO LA TAO đã bình luận bài viết của bạn',
    type: 2,
    isRead: false,
    data: {
      id: '663350aba8625428e5449035',
      image:
        'https://i.pinimg.com/236x/4b/f3/2a/4bf32ae5f06735b1d83174e9c90a385b.jpg',
    },
    createdAt: '2024-05-02T13:11:20.879Z',
    updatedAt: '2024-05-02T13:11:20.879Z',
    __v: 0,
  },
  {
    _id: '663390f4f26602a8d6a64ede',
    user: '66177bcbc3728898cc04df2d',
    content: 'TAO LA TAO đã chia sẻ bài viết của bạn',
    type: 1,
    isRead: false,
    data: {
      id: '663390f4f26602a8d6a64edb',
      image:
        'https://i.pinimg.com/236x/4b/f3/2a/4bf32ae5f06735b1d83174e9c90a385b.jpg',
    },
    createdAt: '2024-05-02T13:11:16.513Z',
    updatedAt: '2024-05-02T13:11:16.513Z',
    __v: 0,
  },
  {
    _id: '663390d4f26602a8d6a64ed2',
    user: '66177bcbc3728898cc04df2d',
    content: 'TAO LA TAO đã thích bài viết của bạn',
    type: 0,
    isRead: false,
    data: {
      id: '663350aba8625428e5449035',
      image:
        'https://i.pinimg.com/236x/4b/f3/2a/4bf32ae5f06735b1d83174e9c90a385b.jpg',
    },
    createdAt: '2024-05-02T13:10:44.735Z',
    updatedAt: '2024-05-02T13:10:44.735Z',
    __v: 0,
  },
];
const Notification = () => {
  const notifications = useAppSelector(state => state.noti.notification);
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.text}>{t('Notification')}</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({item}) => <CardViewNoti {...item} />}
      />
    </SafeAreaView>
  );
};
type Notification = {
  _id: string;
  user: string;
  content: string;
  type: number;
  isRead: boolean;
  data: {
    id: string;
    image?: string; // Optional field
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const CardViewNoti = ({...props}: Notification) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const renderIcon = () => {
    if (props.type === 0) {
      return <IconStar2 />;
    }
  };
  const onPressProfile = () => {
    if (props.type === 4) {
      navigation.navigate(AppStackNames.HomeNavigator,{
        screen:HomeStackNames.UserProfileDetail,
        params:{userId:props.data.id,}
      });
    }else{
      console.log('Noti');
      navigation.navigate(AppStackNames.HomeNavigator,{
        screen:HomeStackNames.CommentNoti,
        params:{post:props.data.id}
      });
    }
  };
  return (
    <TouchableOpacity
    onPress={onPressProfile}
      style={{
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: 70,
          borderRadius: 40,
        }}
        source={{uri: props.data.image}}
      />
      {props.type === 0 && <IconStar2 style={styles.iconStyle} />}
      {props.type === 1 && <IconShare style={styles.iconStyle} />}
      {props.type === 2 && <IconComment2 style={styles.iconStyle} />}
      {props.type === 4 && <IconFollow2 style={styles.iconStyle} />}
      <View style={{
        gap:10
      }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {props.content}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
          }}>
          {formatPostTime(new Date(props.createdAt),i18n.language)}
        </Text> 
      </View>
    </TouchableOpacity>
  );
};
export default Notification;
const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    left: 60,
    bottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerTab: {},
  tabLabel: {
    color: '#484848',
    width: 70,
    height: 21,
    lineHeight: 21,
  },
  header: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 56,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5E4EA0',
    padding: 10,
  },
});
