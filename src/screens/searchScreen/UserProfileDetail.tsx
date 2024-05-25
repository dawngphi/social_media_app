import {ScrollView, Animated, StyleSheet, View, Text} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import HeaderProfile from '../profileScreens/component/HeaderProfile';
import ProfileUserSearch from './component/ProfileUserSearch';
import TopTabProfile from '../profileScreens/component/TopTabProfile';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {
  SearchStackParamList,
  SearchStackNames,
} from '@/navigation/SearchNavigator/config';
import {RouteProp} from '@react-navigation/native';
import AxiosInstance from '@/network/axiosInstance';
import {useDispatch} from 'react-redux';
import {setLoading} from '@/redux/slice/app.slice';
import IconPrivacy from '@/assets/icons/IconPrivacy';
import {Post} from '@/type';
const axios = AxiosInstance();
type UserProfileDetailRouteProp = RouteProp<
  SearchStackParamList,
  SearchStackNames.UserProfileDetail
>;
const UserProfileDetail = () => {
  const route = useRoute<UserProfileDetailRouteProp>();
  const {userId} = route.params;
  const {userName} = route.params;
  const [accountType, setAccountType] = useState<Number>(-1);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const translateY = scrollY.interpolate({
    inputRange: [0, 550],
    outputRange: [0, -373],
    extrapolate: 'clamp',
  });
  const [post, setPost] = useState<Post[]>([]);
  // Giả sử chiều cao của HeaderProfile là 60
  const headerHeight = 50;
  const getProfile = async () => {
    dispatch(setLoading(true));
    try {
      const response: any = await axios.get(`/user/${userId}`);
      setAccountType(response.data.account_type);
      setPost(response.myPost);
      setIsFollowed(response.isFollowing);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getProfile();
  }, [userId]);
  const handleSetFollow = (isFollow: boolean) => {
    setIsFollowed(isFollow);
  };
  const isShowPost = ()=>{
    if(accountType == 1){
      return true
    }
    if(accountType == 0 && isFollowed == true){
      return true
    }
    if(accountType == 0){
      return false
    }

  }
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <HeaderProfile
          userId={userId}
          isMine={false}
          nameTitle={userName}
          iconTick={false}
        />
      </View>
      <View style={{flex: 1}}>
        <Animated.View
          style={{transform: [{translateY}], marginTop: headerHeight}}>
          <View style={styles.profileUserContainer}>
            <ProfileUserSearch
              setIsFollowed={handleSetFollow}
              isFollow={isFollowed}
              userId={userId}
            />
          </View>
          {!isShowPost() && (
            <View style={styles.PrivateStyleContainer}>
              <IconPrivacy />
              <Text style={styles.PrivateStyleText}>
                This account is private
              </Text>
            </View>
          )}
          {isShowPost() && (
            <View style={{height: '100%'}}>
              <TopTabProfile
                repost={post.filter(item => {
                  return item.isRepost;
                })}
                post={post.filter(item => {
                  return !item.isRepost;
                })}
                scrollY={scrollY}
              />
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};
export default UserProfileDetail;

const styles = StyleSheet.create({
  PrivateStyleText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000000',
  },
  PrivateStyleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileUserContainer: {
    // Ensure the profile user stays above the tabs when scrolling
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3, // Ensure the header stays above everything
  },
});
