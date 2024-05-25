import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconShare from '@/assets/icons/IconShare';
import Icontick from '@/assets/icons/Icontick';
import IconLink from '@/assets/icons/IconLink';
import IconStar from '@/assets/icons/IconStar';
import AxiosInstance from '@/network/axiosInstance';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLoading} from '@/redux/slice/app.slice';
import {set} from 'react-hook-form';
import LottieView from 'lottie-react-native';
import {animations} from '@/assets';
const axios = AxiosInstance();
type ProfileUserProps = {
  userId: string;
  onPressEditProfile?: () => void;
  isFollow?: boolean;
  setIsFollowed?: (isFollow: boolean) => void;
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

const ProfileUserSearch: React.FC<ProfileUserProps> = ({
  userId,
  onPressEditProfile,
  isFollow,
  setIsFollowed,
}) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const [avatar, setAvatar] = useState('');
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState([]);
  const [followerNames, setFollowerNames] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      getProfile();
      getFollowers();
      getFollowings();
    }
   
  }, [isFocused]);
  const getProfile = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`/user/${userId}`);
      setFullName(response.data.fullName);
      setUserName(response.data.userName);
      setBio(response.data.bio);
      setLink(response.data.links.join(''));
      setAvatar(response.data.avatar);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance().patch(`/user/follow/${id}`);
      setIsFollowed && setIsFollowed(!isFollow);
      await getFollowers();
      await getFollowings();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getFollowings = async () => {
    try {
      const response = await axios.get(`user/following/${userId}`);
      setFollowings(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowers = async () => {
    try {
      const response = await axios.get(`user/follower/${userId}`);
      setFollowers(response.data);
      const names = response.data.map((follower: Follower) => follower.following.fullName).slice(0, 4).join(', ');
      setFollowerNames(names);
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
          <TouchableOpacity
            onPress={() => {
              handleFollow(userId);
            }}
            style={styles.ButtonEditProfileStyle}>
            {!isLoading ? (
              <Text style={styles.EditProfileTextStyle}>
                {isFollow ? 'Unfollow' : 'Follow'}
              </Text>
            ) : (
              <LottieView
                style={{width: 40, height: 25}}
                source={animations.listLoading}
                autoPlay
                loop
              />
            )}
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
        <View style={styles.LinkContainer}>
          <IconLink />
          <Text style={styles.LinkTextStyle}>{link}</Text>
        </View>
      </View>
      <View style={styles.FollowerContainer}>
        <View style={styles.FollowerItemContainer}>
          <Text style={styles.FollowQuantity}>{followers.length}</Text>
          <Text style={styles.FollowTextStyle}>followers</Text>
        </View>
        <IconStar style={styles.IconStarStyle} />
        <View style={styles.FollowerItemContainer}>
          <Text style={styles.FollowQuantity}>{followings.length}</Text>
          <Text style={styles.FollowTextStyle}>following</Text>
        </View>
      </View>
    </View>
  );
};
export default ProfileUserSearch;
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
    marginLeft: 8,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 48,
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
