import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@/theme';
import UserInfo from '@/screens/post/components/userInfo';
import ToolBar from '@/screens/post/components/toolBar';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import MediaContent from '@/screens/post/components/mediaContent';
import ListMediaContent from '@/screens/post/components/listMediaContent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {icons} from '@/assets';
import {useTranslation} from 'react-i18next';
import AxiosInstance from '@/network/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackParamList} from '@/navigation/login';
import {HomeStackParamList} from '@/navigation/HomeNavigator/config';
import {Media} from '@/type';
import {useAppDispatch} from '@/redux/store';
import {upLoadPost} from '@/redux/action/post.action';
import UnpinIcon from '@/assets/icons/UnPint';

const PostScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [medias, setMedias] = useState<Array<ImageOrVideo>>([]);
  const [toolBarHeight, setToolBarHeight] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [audienceType, setAudienceType] = useState<number>(0);
  const {t} = useTranslation();
  const [textContent, setTextContent] = useState<string>('');
  const imagesPath: Array<string> = [];
  const mediaUploaded: Media[] = [];
  const [isBottomSheetImageOpen, setIsBottomSheetImageOpen] =
    useState<boolean>(false);
  const bottomSheetImageRef = useRef<BottomSheet>(null);
  const snapPointsImage = useMemo(() => ['35%'], []);
  const [uploading, setUploading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  function handleOpenGallery() {
    ImagePicker.openPicker({})
      .then(image => {
        setMedias([image, ...medias]);
      })
      .catch(() => {
        console.log('Cancel');
      });
    toggleBottomSheetImage();
  }

  function handleOpenCamera() {
    ImagePicker.openCamera({}).then(image => {
      setMedias([image, ...medias]);
    });
    toggleBottomSheetImage();
  }

  const toggleBottomSheet = () => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const toggleBottomSheetImage = () => {
    if (isBottomSheetImageOpen) {
      bottomSheetImageRef.current?.close();
    } else {
      bottomSheetImageRef.current?.expand();
    }
    setIsBottomSheetImageOpen(!isBottomSheetImageOpen);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handlePresentImageModalPress = useCallback(() => {
    bottomSheetImageRef.current?.expand();
  }, []);
  const dispatch = useAppDispatch();
  const createPost = async () => {
    const media = imagesPath.map(value => {
      return {
        link: value,
      };
    });
    const data = {
      body: textContent,
      privacy: audienceType,
      media: media,
    };
    await dispatch(upLoadPost(data));
    navigation.goBack();
    setTextContent('');
    setMedias([]);
    setUploading(false);
  };

  const uploadImages = async () => {
    if (!uploading) {
      if (textContent === '' && medias.length === 0) {
      } else if (medias.length === 0) {
        setUploading(true);
        await createPost();
      } else {
        try {
          setUploading(true);
          for (let i = 0; i < medias.length; i++) {
            const formData = new FormData();
            formData.append('image', {
              uri:
                Platform.OS === 'android'
                  ? medias[i].path
                  : medias[i].path.replace('file://', ''),
              type: medias[i].mime,
              name: 'image',
            });
            const response = await AxiosInstance('multipart/form-data').post(
              'upload',
              formData,
            );
            if (response.status === 200) {
              imagesPath.push(response.data.link);
            } else {
              Alert.alert('Upload image error');
              throw new Error('Upload image error');
            }
          }
          await createPost();
        } catch (error) {
          console.error('Error uploading images:', error);
        } finally {
          setUploading(false);
        }
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newMedias = medias.filter((_, i) => i !== index);
    setMedias(newMedias);
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setTextContent('');
              setMedias([]);
            }}>
            <Text style={styles.cancelForeground}>{t('Cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={uploadImages}
            disabled={uploading}
            style={styles.postBackground}>
            <Text style={styles.postForeground}>
              {uploading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                t('Post')
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.paddingHorizontal}>
            <UserInfo />
            <TextInput
              ref={inputRef}
              value={textContent}
              onChangeText={setTextContent}
              cursorColor={colors.primaryColor}
              multiline={true}
              placeholderTextColor={colors.neutralWhite}
              placeholder={t('Write your thought...')}
              style={styles.inputContent}
            />
          </View>
          <ScrollView
            contentContainerStyle={{padding: 25}}
            horizontal
            style={{paddingBottom: toolBarHeight}}>
            {medias.map((media, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 400,
                    height: 500,
                    margin: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveImage(index);
                    }}
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 1,
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                    <UnpinIcon />
                  </TouchableOpacity>
                  <Image
                    source={{uri: media.path}}
                    style={{
                      borderRadius: 30,
                      resizeMode: 'cover',
                      width: 400,
                      height: 500,
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </ScrollView>
        <ToolBar
          editMode={false}
          showBottomSheet={setIsBottomSheetImageOpen}
          handlePresentModalPress={handlePresentModalPress}
          handlePresentImageModalPress={handlePresentImageModalPress}
          audienceType={audienceType}
          setMedias={setMedias}
          setToolBarHeight={setToolBarHeight}
        />
      </SafeAreaView>
      <View
        style={{width: '100%', height: '100%', flex: 1, position: 'absolute'}}>
        {isBottomSheetImageOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={toggleBottomSheetImage}
            activeOpacity={0.1}
          />
        )}
        <BottomSheet
          ref={bottomSheetImageRef}
          index={-1}
          snapPoints={snapPointsImage}
          onChange={index => {
            setIsBottomSheetImageOpen(index !== -1);
          }}>
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.text}>{t('Choose')}</Text>
            <Text style={{marginTop: 12, fontSize: 16, fontWeight: '400'}}>
              {t('Choose image form camera or gallery')}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: colors.neutralWhite4,
                marginTop: 28,
              }}
            />
            <TouchableOpacity
              onPress={handleOpenCamera}
              style={{
                flexDirection: 'row',
                marginTop: 28,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{width: 24, height: 24}}
                  source={icons.ic_camera}
                />
                <Text style={styles.textWorl}>{t('Open Camera')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOpenGallery}
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{width: 24, height: 24}}
                  source={icons.ic_gallery}
                />
                <Text style={styles.textWorl}>{t('Open Gallery')} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
      <View
        style={{width: '100%', height: '100%', flex: 1, position: 'absolute'}}>
        {isBottomSheetOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={toggleBottomSheet}
            activeOpacity={0.1}
          />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={index => {
            setIsBottomSheetOpen(index !== -1);
          }}>
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.text}>{t('Who can reply?')}</Text>
            <Text style={{marginTop: 12, fontSize: 16, fontWeight: '400'}}>
              {t('Pick who can reply to this post')}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: colors.neutralWhite4,
                marginTop: 28,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setAudienceType(0);
              }}
              style={{
                flexDirection: 'row',
                marginTop: 28,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{width: 34, height: 24}} source={icons.planet} />
                <Text style={styles.textWorl}>{t('Worldwide')}</Text>
              </View>
              <TouchableOpacity>
                <View style={styles.radio}>
                  {audienceType === 0 ? <View style={styles.radio1} /> : null}
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAudienceType(1);
              }}
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{width: 34, height: 24}} source={icons.frame} />
                <Text style={styles.textWorl}>{t('People you follow')} </Text>
              </View>
              <TouchableOpacity>
                <View style={styles.radio}>
                  {audienceType == 1 ? <View style={styles.radio1} /> : null}
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAudienceType(2);
              }}
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{width: 34, height: 24}} source={icons.ic_tag} />
                <Text style={styles.textWorl}>
                  {t('Only people you mention')}
                </Text>
              </View>
              <TouchableOpacity>
                <View style={styles.radio}>
                  {audienceType == 2 ? <View style={styles.radio1} /> : null}
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.neutralWhite4,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.neutralBlack,
    alignItems: 'center',
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
  bottomSheetContainer: {
    height: 255,
    padding: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  pick: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 25,
    height: 24,
  },
  text: {
    fontSize: 24,
    color: colors.purple,
    fontWeight: '700',
  },
  textWorl: {
    marginStart: 16,
    fontSize: 18,
    color: colors.purple,
    fontWeight: '400',
  },
  radio1: {
    width: 10,
    height: 10,
    backgroundColor: colors.pink,
    borderRadius: 15,
    margin: 3,
  },
  radio: {
    width: 20,
    height: 20,
    borderColor: colors.pink,
    borderWidth: 2,
    borderRadius: 15,
  },
  inputContent: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.neutralBlack,
    paddingVertical: 16,
  },
  appBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
  },
  cancelForeground: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '400',
  },
  postForeground: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  postBackground: {
    width: 78,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
  },
});

export default PostScreen;
