import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '@/theme';
import SvgSwitch from '@/assets/icons/iconSVG/Switch';
import SvgSend from '@/assets/icons/iconSVG/Send';
import SvgComponent from '@/assets/icons/iconSVG/Comments';
import SvgStar from '@/assets/icons/iconSVG/Star';
import Svg3dot from '@/assets/icons/iconSVG/3dot';
import SvgStar2 from '@/assets/icons/iconSVG/Star2';
import AutoHeightImage from 'react-native-auto-height-image';
import Share from 'react-native-share';
import ListImageContent from '@/screens/home/components/ListImageContent';
import {formatPostTime} from '@/utils/time';
import {Media, Reposter} from '@/type';
import {useAppDispatch} from '@/redux/store';
import {NewfeedAction} from '@/redux/action/newfeed.action';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchStackNames} from '@/navigation/SearchNavigator/config';
import {HomeStackNames} from '@/navigation/HomeNavigator/config';
import {AppStackNames} from '@/navigation/config';
import {use} from 'i18next';
import {useAppSelector} from '@/redux/store';
import {userInfoSelector} from '@/redux/test/userStore';
import ProfileScreen from '@/screens/profileScreens/ProfileScreen';
import {ProfileStackNames} from '@/navigation/ProfileNavigator/config';
import AxiosInstance from '@/network/axiosInstance';
import CustomToast from '@/components/Toast/CutomToast';
import {setLoading} from '@/redux';
import {useTranslation} from 'react-i18next';
import i18n from '@/language/i18n';

const axios = AxiosInstance();

interface CardViewProps {
  userName: string;
  fullName: string;
  rootPostId?: string;
  resposter?: Reposter;
  _id: string;
  avatar: string;
  hour: Date;
  userId: string;
  title: string;
  description: string;
  tag?: string;
  image: Media[];
  star: number;
  comment: number;
  url?: string;
  onPress?: () => void;
  onPressSwitch?: () => void;
  onPressDetail?: () => void;
  onPressCommentShow?: () => void;
  style?: any;
  isLike: boolean;
  showView?: boolean;
}

const CardView: React.FC<CardViewProps> = ({...props}) => {
  const userInfor = useAppSelector(userInfoSelector);
  const [focus, setfocus] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const [showLikesModal, setShowLikesModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const handleRepost = async () => {
    dispatch(setLoading(true));
    try {
      await AxiosInstance().post(`post/repost/${props._id}`);
      dispatch(NewfeedAction.fetchMyPost());
      CustomToast({
        type: 'success',
        message: 'Đã đăng lại',
      });
    } catch (err) {
      console.log('err', err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  interface LikedUser {
    userName: string;
    fullName: string;
    avatar: string;
    _id: string;
  }
  const [likedUsers, setLikedUsers] = useState<LikedUser[]>([]);
  const appDispatch = useAppDispatch();
  const userInfo = useAppSelector(userInfoSelector);

  const handleLike = (id: string) => {
    appDispatch(NewfeedAction.likePost(id));
  };
  const onUserNamePress = (userId: string, userName: string): void => {
    if (userId === userInfor._id) {
      console.log('userId2', userId);
      navigation.navigate(AppStackNames.HomeNavigator, {
        screen: HomeStackNames.ProfileNavigator,
        params: {userId: userId, userName: userName},
      });
    } else {
      navigation.navigate(AppStackNames.HomeNavigator, {
        screen: HomeStackNames.UserProfileDetail,
        params: {userId: userId, userName: userName},
      });
    }
  };
  const onSearch = () => {
    const options = {
      message: `VNPIC * Bài viết của ${props.title}`,
      url: 'https://sever-social-media-app.onrender.com/web/post/' + props._id,
      // email: "thp010620@gmail.com",
      // suject: "test",
      // recipient: "0981649752",
      // title: "test"
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const handleLongPressLike = async () => {
    console.log('Long press like id bài viết', props._id);
    const response: any = await axios.get(`post/getReaction/${props._id}`);
    const users = response.reaction.map((r: any) => ({
      userName: r.user_id.userName,
      fullName: r.user_id.fullName,
      avatar: r.user_id.avatar,
      _id: r.user_id._id,
    }));
    console.log('Danh sách người đã like', users);
    setLikedUsers(users);
    setModalVisible(true);
  };
  const handlePressOut = () => {
    setShowLikesModal(false);
  };
  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Người đã like</Text>
          <View style={{width: '100%', marginTop: 15}}>
            {likedUsers.map((user, index) => (
              <View
                key={index}
                style={{flexDirection: 'column', marginBottom: 10}}>
                <TouchableOpacity
                  onPress={() => onUserNamePress(user._id, user.userName)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                    paddingHorizontal: 35,
                  }}>
                  <Image
                    source={{uri: user.avatar}}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{color: 'black'}}>{user.fullName}</Text>
                </TouchableOpacity>
                <View style={styles.LineStyleModel}></View>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  const { t } = useTranslation();
  return (
    <View style={props.style}>
      {renderModal()}
      {props.showView ? (
        <View
          style={{
            width: 450,
            height: 1,
            borderWidth: 0.1,
            backgroundColor: '#E3E3E3',
          }}
        />
      ) : (
        <View style={{height: 0}} />
      )}
      {props.resposter ? (
        <RepostHeader
          reposter={props.resposter}
          onUserNamePress={onUserNamePress}
        />
      ) : (
        <View style={{height: 0}} />
      )}
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.imgCar} source={{uri: props.avatar}} />
          <View>
            <TouchableOpacity
              onPress={() => {
                onUserNamePress(props.userId, props.fullName);
              }}
              style={styles.containerTick}>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: colors.black}}>
                {props.fullName ?? props.userName}
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: 12, marginStart: 10, marginTop: 3}}>
            {formatPostTime( new Date(props.hour),i18n.language)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={props.onPress}>
          <Svg3dot />
        </TouchableOpacity>
      </View>
      {props.description ? (
        <Text style={styles.title}>{props.description}</Text>
      ) : (
        <View style={{height: 0}} />
      )}
      <Text style={styles.tag}>
        {props.tag ? `#${props.tag}` : <View style={{height: 0}} />}
      </Text>
      {props.image.length === 1 ? (
        <AutoHeightImage
          style={styles.avatar}
          width={370}
          source={{uri: props.image[0].link}}
        />
      ) : props.image.length > 1 ? (
        <ListImageContent medias={props.image} />
      ) : (
        <View style={{height: 0}} />
      )}
      <View style={styles.containerAction}>
        <TouchableOpacity
          onLongPress={handleLongPressLike}
          onPressOut={handlePressOut}
          onPress={() => {
            handleLike(props._id);
          }}>
          {props.isLike ? <SvgStar2 /> : <SvgStar />}
        </TouchableOpacity>
        <Text style={styles.textAction}>{props.star}</Text>

        <TouchableOpacity
          onPress={props.onPressCommentShow}
          style={styles.space}>
          <SvgComponent />
        </TouchableOpacity>
        <Text style={styles.textAction}>{props.comment}</Text>
        <TouchableOpacity onPress={handleRepost} style={styles.space}>
          <SvgSwitch />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearch} style={styles.space}>
          <SvgSend />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardView;

const RepostHeader = ({
  reposter,
  onUserNamePress,
}: {reposter: Reposter} & {
  onUserNamePress: (userId: string, userName: string) => void;
}) => {
  const name = reposter.fullName ? reposter.fullName : reposter.userName;
  const { t } = useTranslation();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}>
        <Image
          style={{...styles.imgCar, width: 35, height: 35}}
          source={{uri: reposter.avatar}}
        />
        <View
          style={{
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={() => {
              onUserNamePress(reposter._id, reposter.userName);
            }}
            style={{...styles.containerTick}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: colors.black,
                marginEnd: 10,
              }}>
              {name + ' '}
              <Text style={{color: colors.primaryColor, marginLeft: 10}}>
              {t("Republish")}
              </Text>
            </Text>
            <SvgSwitch color={colors.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: 450,
          height: 1,
          borderWidth: 0.1,
          backgroundColor: '#E3E3E3',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  LineStyleModel: {
    borderWidth: 0.3,
    width: '90%',
    borderColor: '#D9D9D9',
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: '90%',
    height: '87%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 40,
    position: 'absolute',
    bottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  space: {
    marginStart: 20,
  },
  textAction: {
    fontSize: 14,
    color: colors.black,
    marginStart: 8,
  },
  containerAction: {
    flexDirection: 'row',
    marginTop: 16,
    marginStart: 20,
    marginBottom: 12,
  },
  avatar: {
    borderRadius: 20,
    marginTop: 12,
    height: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.pink,
    marginStart: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    marginStart: 20,
    width: 359,
    marginBottom: 10,
  },
  containerTick: {
    flexDirection: 'row',
    marginStart: 12,
    justifyContent: 'space-between',
  },
  imgCar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
});

