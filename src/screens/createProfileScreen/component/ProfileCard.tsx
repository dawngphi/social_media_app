import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackEnum, LoginStackParamList } from '@/navigation/login';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/store';
import { userInfoSelector } from '@/redux/test/userStore';
import AxiosInstance from '@/network/axiosInstance';
import ButtonBottom from './ButtonBottom';
import { useDispatch } from 'react-redux';
import { setLoading} from '@/redux/slice/app.slice';

const axios = AxiosInstance();

const ProfileCard  = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null,
  );
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true;
        } else {
          console.log('Camera permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleSelectImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an option to select your avatar',
      [
        {
          text: 'Choose from Device',
          onPress: () => openImagePicker(),
        },
        {
          text: 'Open Camera',
          onPress: () => handleCameraLaunch(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 100,
      maxWidth: 100,
    };

    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets[0].uri) {
          const uploadImageUri = await uploadImage(response.assets[0]);
          console.log(uploadImageUri, 'uploadImageUri');
          setSelectedImage(uploadImageUri);
        }
      }
    } catch (error) {
      console.log('An error occurred: ', error);
    }
  };

  const handleCameraLaunch = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 100,
      maxWidth: 100,
    };

    try {
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {

        if (response.assets && response.assets[0].uri) {
          const uploadImageUri = await uploadImage(response.assets[0]);
          setSelectedImage(uploadImageUri);
        }
      }
    } catch (error) {
      console.log('An error occurred: ', error);
    }
  };
  const uploadImage = async (img: any) => {
    const axios = AxiosInstance('multipart/form-data');
    console.log('Uploading image', img);
    const formData = new FormData();
    formData.append('image', {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    });
    try {
      const response = await axios.post('upload', formData);
      console.log('Upload success', response.data.link);
      return response.data.link; // Trả về link ảnh

    } catch (error) {
      console.log('Upload error', error);
      return null;
    }
  };
  const { t } = useTranslation();

  const openEditBioScreen = () => {
    navigation.navigate(LoginStackEnum.EditBioScreen, {
      onSaveBio: (newBio: string) => setBio(newBio),
    });
  };
  const openEditLinkScreen = () => {
    navigation.navigate(LoginStackEnum.EditLinkScreen, {
      onSaveLink: (newLink: string) => setLink(newLink),
    });
  };
  const userInfo = useAppSelector(userInfoSelector);
  useEffect(() => {
    if (userInfo) {
      setFullName(userInfo.fullName);
      setSelectedImage(userInfo.avatar);
    }
  }, [userInfo]);
  console.log(selectedImage, 'selectedImage');
  const data = {
    fullName: fullName,
    avatar: selectedImage,
    bio: bio,
    links: [link],
  };
  const onPressNext = async (data: any) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.patch('user/update_info', data);
      dispatch(setLoading(false));
      console.log('Update success', response);
      navigation.navigate(LoginStackEnum.PrivacyProfileScreen);
      return response;
    } catch (error) {
      console.error('Error update', JSON.stringify(error));
    }
    

    console.log(userInfo);
    // navigation.navigate(LoginStackEnum.PrivacyProfileScreen)
  }
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.NameContainer}>
          <View style={styles.NameTitleContainer}>
            <Text style={styles.NameTitle}>{t('Name')}</Text>
            <View style={styles.TextInputContainer}>
              <FontAwesomeIcon icon={faUser} size={15} color="#000" />
              <TextInput
                placeholder={t('+ Name')}
                style={styles.TextInputStyle}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.ButtonCamera}
            onPress={handleSelectImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} size={20} color="#000" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.NameContainer}>
          <View style={styles.NameTitleContainer}>
            <TouchableOpacity onPress={openEditBioScreen}>
              <Text style={styles.NameTitle}>Bio</Text>
              <TextInput
                placeholder="+ Bio"
                style={styles.TextInputStyle}
                value={bio}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.NameContainer}>
          <View style={styles.NameTitleContainer}>
            <TouchableOpacity onPress={openEditLinkScreen}>
              <Text style={styles.NameTitle}>Link</Text>
              <TextInput
                placeholder="+ Link"
                style={styles.TextInputStyle}
                value={link}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style = {{marginTop:150}}>
        <ButtonBottom title={t('Next')} backgroundColor='#5E4EA0' color='#FFFFFF' onPress={() =>onPressNext(data)} />
      </View>

    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'cover',
  },
  TextInputStyle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    marginLeft: 5,
    width:200
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
  ButtonCamera: {
    borderRadius: 25,
    backgroundColor: '#E3E3E3',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  NameTitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#000',
  },
  NameTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  NameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  Container: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    marginTop: 82,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 26,
    padding: 26,
  },
});