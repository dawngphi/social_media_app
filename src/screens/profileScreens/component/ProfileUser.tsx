import {Image, StyleSheet, Text, TouchableOpacity, View, Linking, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconShare from '@/assets/icons/IconShare';
import Icontick from '@/assets/icons/Icontick';
import IconLink from '@/assets/icons/IconLink';
import IconStar from '@/assets/icons/IconStar';
import {useAppSelector} from '@/redux/store';
import {userInfoSelector} from '@/redux/test/userStore';
import AxiosInstance from '@/network/axiosInstance';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setLoading} from '@/redux/slice/app.slice';
import { set } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigatorProps } from '@/navigation/ProfileNavigator/config';
import { ProfileStackNames } from '@/navigation/ProfileNavigator/config';
const axios = AxiosInstance();
type ProfileUserProps = {
  onPressEditProfile: () => void;
};
interface Follower {
  _id: string;
  following: {
    _id: string;
    avatar: string;
    fullName: string;
    userName: string;
  };
}

const ProfileUser: React.FC<ProfileUserProps> = ({onPressEditProfile}) => {
  const {t} = useTranslation();
  const userInfor = useAppSelector(userInfoSelector);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const [avatar, setAvatar] = useState('');
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState([]);
  const [followerNames, setFollowerNames] = useState('');
  const navigation = useNavigation<ProfileNavigatorProps>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused)
      {
        getProfile();
        getFollowers();
        getFollowings();
      } 
  }, [userInfor._id, isFocused]);
  
  const getProfile = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`user/${userInfor._id}`);
      setFullName(response.data.fullName);
      setUserName(response.data.userName);
      setBio(response.data.bio);
      setLink(response.data.links.join(''));
      setAvatar(response.data.avatar);
      return response.data;
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoading(false));
    }
  };
  const getFollowings = async () => {
    try {
      const response = await axios.get(`user/following/${userInfor._id}`);
      setFollowings(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowers = async () => {
    try {
      const response = await axios.get(`user/follower/${userInfor._id}`);
      setFollowers(response.data);
      const names = response.data.map((follower: Follower) => follower.following.fullName).slice(0, 4).join(', ');
      setFollowerNames(names);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const renderFollowerAvatars = () => {
    return followers.slice(0, 3).map((follower, index) => (
      <Image
        key={follower._id}
        source={{ uri: follower.following.avatar }}
        style={[styles.AvatarPeopleStyle, index !== 0 && styles.OverlapAvatar]}
      />
    ));
  };
  const onPressListFollower = () => {
    console.log('Đang cố gắng mở danh sách người theo dõi');
    navigation.navigate(ProfileStackNames.FollowAndFriends);
    
  };
  const openLink = () => {
    console.log("Đang cố gắng mở URL:", link); // Ghi nhật ký để gỡ lỗi
    // Linking.canOpenURL(link)
    //   .then(supported => {
    //     if (supported) {
    //       Linking.openURL(link);
    //     } else {
    //       console.log("Không biết cách mở URI:", link);
    //       // Tùy chọn, thông báo cho người dùng hoặc xử lý khác
    //       Alert.alert("Lỗi", "Không thể mở liên kết. Vui lòng kiểm tra URL hoặc thử lại sau.");
    //     }
    //   })
    //   .catch(err => {
    //     console.error("Đã xảy ra lỗi", err);
    //     Alert.alert("Lỗi", "Đã xảy ra lỗi bất ngờ. Vui lòng thử lại sau.");
    //   });
    Linking.openURL(link);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.AvatarContainer}>
        <View>
          <Image
            source={require('@/assets/images/backgroundavatarprofile.png')}
            style={styles.BackgroundAvatar}
          />
          <Image
            source={
              avatar
                ? {uri: avatar}
                : require('../../../assets/images/noAvatar.png')
            }
            style={styles.AvatarStyle}
          />
        </View>
        <View style={styles.EditProfileContainer}>
          <TouchableOpacity style={styles.ButtonEditProfileStyle} onPress={onPressEditProfile}>
            <Text style={styles.EditProfileTextStyle}>{t('Edit profile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonShareStyle}>
            <IconShare />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.NameContainer}>
        <Text style={styles.NameTextStyle}>{fullName}</Text>
      </View>
      <View style={styles.StoryContainer}>
        <Text style={styles.StoryTextStyle}>{userName}</Text>
        <Text style={styles.StoryTextStyle}>{bio}</Text>
        <TouchableOpacity style={styles.LinkContainer} onPress={openLink}>
          <IconLink />
          <Text style={styles.LinkTextStyle}>{link}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.FollowerContainer} onPress={onPressListFollower}>
        <View style={styles.FollowerItemContainer}>
          <Text style={styles.FollowQuantity}>{followers.length}</Text>
          <Text style={styles.FollowTextStyle}>{t('followers')}</Text>
        </View>
        <IconStar style={styles.IconStarStyle} />
        <View style={styles.FollowerItemContainer}>
          <Text style={styles.FollowQuantity}>{followings.length} </Text>
          <Text style={styles.FollowTextStyle}>{t('Following')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.PeopleFollowerContainer} onPress={onPressListFollower}>
        <View style={styles.ImagePeopleContainer}>
          {/* <Image
            source={require('@/assets/images/nytao.png')}
            style={styles.AvatarPeopleStyle}
          />
          <Image
            source={require('@/assets/images/nytao.png')}
            style={[styles.AvatarPeopleStyle, styles.OverlapAvatar]}
          />
          <Image
            source={require('@/assets/images/nytao.png')}
            style={[styles.AvatarPeopleStyle, styles.OverlapAvatar]}
          /> */}
          {renderFollowerAvatars()}
        </View>
        <Text style={styles.FollowPeopleTextStyle}>
          Followed by {followerNames}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileUser;
const styles = StyleSheet.create({
  FollowPeopleTextStyle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#767676',
    marginLeft: 8,
    width: 310,
  },
  OverlapAvatar: {
    marginLeft: -10,
  },
  AvatarPeopleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  ImagePeopleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  PeopleFollowerContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  FollowTextStyle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#767676',
  },
  FollowQuantity: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#3F3E3E',
    marginRight: 3,
  },
  IconStarStyle: {
    marginLeft: 8,
    marginRight: 8,
  },
  FollowerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FollowerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  LinkTextStyle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#5E4EA0',
    marginLeft: 4,
  },
  LinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  StoryTextStyle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#3F3E3E',
  },
  StoryContainer: {
    marginTop: 10,
  },
  NameTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2B2B',
    marginRight: 8,
  },
  NameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
  },
  ButtonShareStyle: {
    width: 40,
    height: 40,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditProfileTextStyle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#2C2B2B',
    textAlign: 'center',
  },
  ButtonEditProfileStyle: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
  EditProfileContainer: {
    flexDirection: 'row',
  },
  BackgroundAvatar: {
    width: 138,
    height: 138,
  },
  AvatarStyle: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 60,
  },
  AvatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Container: {
    padding: 16,
  },
});
