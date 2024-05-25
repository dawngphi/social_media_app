import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@/theme';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  HomeStackNames,
  HomeStackParamList,
} from '@/navigation/HomeNavigator/config';
import Svgback from '@/assets/icons/iconSVG/Back';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CardView from '@/screens/home/components/CardView';
import {icons} from '@/assets';
import AxiosInstance from '@/network/axiosInstance';
import {Comment} from '@/type';
import {AppStackNames} from '@/navigation/config';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {userInfoSelector} from '@/redux/test/userStore';
import BottomSheet from '@gorhom/bottom-sheet';
import {setLoading} from '@/redux';
import {upDateComment} from '@/redux/slice/newfeed.slice';
import {formatPostTime} from '@/utils/time';
import {useTranslation} from 'react-i18next';
import i18n from '@/language/i18n';

type PostDetailRouteProp = RouteProp<
  HomeStackParamList,
  HomeStackNames.CommentNoti
>;

const CommentNoti = () => {
  const userInfo = useAppSelector(userInfoSelector);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const appDispatch = useAppDispatch();
  const flatListRef = useRef<ScrollView>(null);
  const route = useRoute<PostDetailRouteProp>();
  const postId = route.params.post;
  const [comments, setComments] = useState<Comment[]>([]);
  const screenWidth = Dimensions.get('window').width;
  const [textInput, setTextInput] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [reply, setReply] = useState<string>('');
  const bottomSheet = useRef<BottomSheet>(null);
  const [isBottomSheet, setIsBottomSheet] = useState<boolean>(false);
  const snapPoints = useMemo(() => [200], []);
  const [selectComment, setSelectComment] = useState<Comment | null>(null);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const handlePushComment = async (postId: string) => {
    if (textInput !== '') {
      try {
        appDispatch(setLoading(true));
        inputRef.current?.blur();
        const data =
          reply === ''
            ? {body: textInput}
            : {body: textInput, repply_to: reply};
        setTextInput('');
        setReply('');
        const resData = await AxiosInstance().post(
          `post/comment/${postId}`,
          data,
        );
        setComments(resData.data.postComment);
        flatListRef.current?.scrollToEnd({animated: true});
        appDispatch(upDateComment({postId, comment: resData.data.postComment}));
      } catch (e) {
        console.log(e);
      } finally {
        appDispatch(setLoading(false));
      }
    }
  };

  const onUserNamePress = (userId: string, userName: string): void => {
    if (userId !== userInfo._id) {
      navigation.navigate(AppStackNames.HomeNavigator, {
        screen: HomeStackNames.UserProfileDetail,
        params: {userId: userId, userName: userName},
      });
    }
  };

  const handleReply = (item: Comment) => {
    inputRef.current?.focus();
    setReply(item._id);
    setTextInput(`${item.create_by.fullName}: `);
  };

  const toggleBottomSheet = (comment: Comment | null) => {
    if (isBottomSheet) {
      bottomSheet.current?.close();
    } else {
      bottomSheet.current?.expand();
    }
    setSelectComment(comment);
    setIsBottomSheet(!isBottomSheet);
  };

  const handleDeleteComment = async () => {
    const resData = await AxiosInstance().delete(
      `post/delete_comment/${selectComment?._id}`,
    );
    setComments(resData.data.postComment);
    flatListRef.current?.scrollToEnd({animated: true});
    const postId = selectComment?._id ?? '';
    appDispatch(upDateComment({postId, comment: resData.data.postComment}));
    toggleBottomSheet(null);
  };

  const handleEditComment = () => {
    toggleBottomSheet(selectComment);
    setTextInput(selectComment?.comment ?? '');
    inputRef.current?.focus();
  };

  const pushEditComment = async () => {
    if (textInput !== '') {
      console.log('edit');
      try {
        inputRef.current?.blur();
        const data = {body: textInput};
        setTextInput('');
        const resData = await AxiosInstance().put(
          `post/edit_comment/${selectComment?._id}`,
          data,
        );
        setComments(resData.data.postComment);
        flatListRef.current?.scrollToEnd({animated: true});
        const postId = selectComment?._id ?? '';
        appDispatch(upDateComment({postId, comment: resData.data.postComment}));
        setSelectComment(null);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    dispatch(setLoading(true));
    const data = AxiosInstance().get(`post/get_post/${postId}`).then(res => {
     setItemData(res.data);
    }).finally(() => {

      dispatch(setLoading(false));
    });
    
  }, []);
  const [itemData, setItemData] = useState<any>(null);
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}>
          <Svgback />
          <Text style={styles.Back}>{t('Back')}</Text>
        </TouchableOpacity>
        <ScrollView ref={flatListRef}>
          {itemData && (
            <CardView
              userName={itemData.author.userName}
              fullName={itemData.author.fullName}
              isLike={itemData.isLiked}
              _id={itemData._id}
              userId={itemData.author._id}
              avatar={itemData.author.avatar}
              hour={itemData.createdAt}
              title={itemData.author.userName}
              description={itemData.body}
              tag={''}
              image={itemData.media}
              star={itemData.reactions.length}
              comment={comments.length}
              url={''}
            />
          )}
          <View style={styles.divider} />
          <FlatList
            scrollEnabled={false}
            data={comments}
            renderItem={({item}) => (
              <View>
                <View
                  style={[styles.commentContainer, {width: screenWidth - 48}]}>
                  <Image
                    style={styles.avatar}
                    source={{uri: item.create_by.avatar}}
                  />
                  <TouchableOpacity
                    onLongPress={() => {
                      item.isMine ? toggleBottomSheet(item) : null;
                    }}>
                    <View style={styles.commentBG}>
                      <TouchableOpacity
                        onPress={() =>
                          onUserNamePress(
                            item.create_by._id,
                            item.create_by.fullName,
                          )
                        }>
                        <Text style={styles.usernameComment}>
                          {item.create_by.fullName ?? item.create_by.userName}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.contentComment}>{item.comment}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 18,
                        marginTop: 6,
                      }}>
                      <Text style={{fontSize: 13}}>
                        {formatPostTime(
                          new Date(item.createdAt),
                          i18n.language,
                        )}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleReply(item)}
                        style={{marginLeft: 16}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: colors.neutralWhite1,
                          }}>
                          {t('Reply')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={item.repplies}
                  renderItem={({item}) => (
                    <View
                      style={[
                        styles.commentReplyContainer,
                        {width: screenWidth - 48},
                      ]}>
                      <Image
                        style={styles.avatarReply}
                        source={{uri: item.create_by.avatar}}
                      />
                      <TouchableOpacity
                        onLongPress={() => {
                          item.create_by._id === userInfo._id
                            ? toggleBottomSheet(item)
                            : null;
                        }}>
                        <View>
                          <View style={styles.commentBG}>
                            <TouchableOpacity
                              onPress={() =>
                                onUserNamePress(
                                  item.create_by._id,
                                  item.create_by.fullName,
                                )
                              }>
                              <Text style={styles.usernameComment}>
                                {item.create_by.fullName}
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.contentComment}>
                              {item.comment}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 18,
                              marginTop: 6,
                            }}>
                            <Text style={{fontSize: 13}}>
                              {formatPostTime(
                                new Date(item.createdAt),
                                i18n.language,
                              )}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          />
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            ref={inputRef}
            multiline={true}
            placeholder="Comment"
            value={textInput}
            onChangeText={text => setTextInput(text)}
            style={styles.textInputStyle}
          />
          <TouchableOpacity
            onPress={() => {
              console.log(selectComment);
              selectComment === null
                ? handlePushComment(itemData._id)
                : pushEditComment();
            }}>
            <Image source={icons.ic_send} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{width: 406, height: '100%', flex: 1, position: 'absolute'}}>
        {isBottomSheet && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => {
              toggleBottomSheet(null);
            }}
            activeOpacity={0.1}
          />
        )}
        <BottomSheet
          ref={bottomSheet}
          snapPoints={snapPoints}
          index={-1}
          onChange={index => {
            setIsBottomSheet(index !== -1);
          }}>
          <View style={styles.containerBottomSheet}>
            <TouchableOpacity
              onPress={() => {
                handleEditComment();
              }}
              style={styles.follow}>
              <Text style={styles.textFollow}>Edit</Text>
              <Image source={icons.ic_edit} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDeleteComment();
              }}
              style={[styles.follow, {marginTop: 16}]}>
              <Text style={styles.textFollow}>Delete</Text>
              <Image source={icons.ic_remove} style={styles.img} />
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default CommentNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  Back: {
    fontSize: 18,
    marginLeft: 8,
    color: colors.black,
    fontWeight: '500',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 32,
  },
  avatarReply: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  commentReplyContainer: {
    flexDirection: 'row',
    paddingLeft: 84,
    paddingTop: 12,
  },
  divider: {
    marginHorizontal: 18,
    height: 0.5,
    backgroundColor: colors.gray,
  },
  commentBG: {
    marginLeft: 12,
    backgroundColor: colors.neutralWhite5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  contentComment: {
    color: colors.black,
    fontSize: 16,
    marginTop: 6,
  },
  usernameComment: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    backgroundColor: colors.neutralWhite5,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  img: {
    marginEnd: 24,
    width: 24,
    height: 24,
  },
  containerBottomSheet: {
    width: 407,
    height: 255,
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
  },
  follow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    width: 330,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  textFollow: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.black,
    marginStart: 20,
  },
});
