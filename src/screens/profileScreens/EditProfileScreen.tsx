import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, PermissionsAndroid, Alert, Image, TouchableWithoutFeedback, Animated, } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useNavigation } from '@react-navigation/native'
import { ProfileNavigatorProps } from '@/navigation/ProfileNavigator/config'
import ButtonSwitch from './component/ButtonSwitch'
import IconRinged from '@/assets/icons/IconRinged'
import IconPrivacy from '@/assets/icons/IconPrivacy'
import AxiosInstance from '@/network/axiosInstance'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/redux/store'
import { userInfoSelector } from '@/redux/test/userStore'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/slice/app.slice'

const axios = AxiosInstance();

const EditProfileCard = () => {
    const navigation = useNavigation<ProfileNavigatorProps>();
    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
        null,
    );
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const originalUserName = useRef(userName); // Lưu trữ giá trị ban đầu của userName
    const [bio, setBio] = useState('');
    const [account_type, setAccount_type] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [link, setLink] = useState('');
    const dispatch = useDispatch();
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
    const userInfo = useAppSelector(userInfoSelector);
    useEffect(() => {
        if (userInfo) {
            getProfile();
        }

    }, [userInfo._id]);
    const data = {
        userName: userName,
        fullName: fullName,
        avatar: selectedImage,
        bio: bio,
        links: [link],
        account_type: account_type,
    };
    const getProfile = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(`/user/${userInfo._id}`);
            setFullName(response.data.fullName);
            setUserName(response.data.userName);
            originalUserName.current = response.data.userName;
            setBio(response.data.bio);
            setLink(response.data.links.join(''));
            setSelectedImage(response.data.avatar);
            setAccount_type(response.data.account_type);
            setIsEnabled(response.data.account_type === 1); // Cập nhật trạng thái switch dựa trên account_type
            animatedValue.setValue(response.data.account_type === 1 ? 1 : 0); // Đặt giá trị animatedValue phù hợp
            return response.data;
        } catch (error) {
            console.log(error);
        }finally{
            dispatch(setLoading(false));
        }
    }
    const onPressNext = async (data: any) => {
        // Kiểm tra xem userName có thay đổi so với giá trị ban đầu không
        if (userName === originalUserName.current) {
            delete data.userName; // Nếu không thay đổi, loại bỏ userName khỏi dữ liệu được gửi đi
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.patch('user/update_info', data);
            navigation.goBack();
            console.log('Update success', response);
            return response;
        } catch (error) {
            console.error('Error update', JSON.stringify(error));
        }finally{
            dispatch(setLoading(false));
        }

    }
    const toggleSwitch = () => {
        setIsEnabled(previousState => {
            const newState = !previousState;
            setAccount_type(newState ? 1 : 0); // Cập nhật account_type dựa trên trạng thái mới của isEnabled
            return newState;
        });
        Animated.timing(animatedValue, {
            toValue: isEnabled ? 0 : 1,
            duration: 250,
            useNativeDriver: false,
        }).start();
    };

    const switchTranslate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 23], // Adjust these values according to the size of your switch
    });
    return (
        <View style={styles.Container}>
            <View style={styles.HeaderContainer}>
                <View style={styles.HeaderBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.TitleCancel}>{t("Cancel")}</Text>
                    </TouchableOpacity>
                    <Text style={styles.EditBio}>{t("profile")}</Text>
                    <TouchableOpacity>
                        <Text style={styles.Done} onPress={() => onPressNext(data)}>{t("Done")}</Text>
                    </TouchableOpacity>

                </View>

            </View>
            <View style={{ height: 1, backgroundColor: '#E3E3E3' }}></View>
            <View style={{ padding: 16 }}>
                <View style={styles.ProfileCard}>
                    <View style={styles.NameContainer}>
                        <View style={styles.NameTitleContainer}>
                            <Text style={styles.NameTitle}>{t("Name")}</Text>
                            <View style={styles.TextInputContainer}>
                                <FontAwesomeIcon icon={faUser} size={15} color="#000" />
                                <TextInput placeholder="+ Name" style={styles.TextInputStyle} value={fullName} onChangeText={setFullName} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.ButtonCamera} onPress={handleSelectImage}>
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={styles.image}
                                />
                            ) : (
                                <FontAwesomeIcon icon={faCamera} size={20} color="#000" />
                            )}

                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.NameContainer}>
                        <View style={styles.NameTitleContainer}>
                            <TouchableOpacity>
                                <Text style={styles.NameTitle}>{t("User name")}</Text>
                                <TextInput placeholder="+ User name" style={styles.TextInputStyle} value={userName} onChangeText={setUserName} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.NameContainer}>
                        <View style={styles.NameTitleContainer}>
                            <TouchableOpacity>
                                <Text style={styles.NameTitle}>Bio</Text>
                                <TextInput placeholder="+ Bio" style={styles.TextInputStyle} value={bio} onChangeText={setBio} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.NameContainer}>
                        <View style={styles.NameTitleContainer}>
                            <TouchableOpacity>
                                <Text style={styles.NameTitle}>Link</Text>
                                <TextInput placeholder="+ Link" style={styles.TextInputStyle} value={link} onChangeText={setLink} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View>
                        <View style={styles.ContainerSwitch}>
                            {/* <Text style={styles.TextStyle}>Your profile is private </Text> */}
                            {
                                isEnabled ? (<Text style={styles.TextStyle}>{t("Your profile is public ")}</Text>) : (<Text style={styles.TextStyle}>{t("Your profile is private ")}</Text>)
                            }
                            <TouchableWithoutFeedback onPress={toggleSwitch}>
                                <View style={styles.switchContainer}>
                                    <Animated.View
                                        style={[
                                            styles.switchCircle,
                                            { transform: [{ translateX: switchTranslate }] },
                                            isEnabled && styles.switchEnabled,
                                        ]}
                                    >
                                        <View style={styles.textContainer}>
                                            {isEnabled ? (<IconRinged /> ? <IconRinged /> : <Text style={styles.switchText}>{t("On")}</Text>) : (<IconPrivacy /> ? <IconPrivacy /> : <Text style={styles.switchText}>Off</Text>)}
                                        </View>
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default EditProfileCard

const styles = StyleSheet.create({
    ContainerSwitch: {
        marginTop: 26,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#fff',

        // iOS bóng đổ
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        // Android bóng đổ
        elevation: 5,
    },
    TextStyle: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // Đảm bảo rằng kích thước của View này đủ lớn để chứa Text
        width: '100%', // Hoặc một giá trị cụ thể nếu cần
        height: '100%', // Tương tự như trên
    },
    switchContainer: {
        width: 72, // Kích thước của container switch
        height: 38, // Chiều cao của container switch
        borderRadius: 18, // Bo góc của container switch
        backgroundColor: '#E9E9EA', // Màu nền của container switch
        padding: 3.5, // Khoảng cách giữa viền và nội dung bên trong
    },
    switchCircle: {
        width: 42.353, // Điều chỉnh chiều rộng của hình chữ nhật
        height: 30, // Điều chỉnh chiều cao của hình chữ nhật để phù hợp với container
        borderRadius: 16, // Bo góc của hình chữ nhật
        backgroundColor: '#fff', // Màu nền của hình chữ nhật
        justifyContent: 'center', // Căn giữa chữ theo chiều dọc
        alignItems: 'center', // Căn giữa chữ theo chiều ngang
    },
    switchText: {
        fontSize: 14, // Kích thước font chữ
        color: '#767676', // Màu chữ
        fontFamily: 'Roboto', // Font chữ
        fontWeight: '700', // Độ đậm của chữ
        alignItems: 'center', // Căn giữa chữ theo chiều dọc
    },
    switchEnabled: {

    },
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    HeaderContainer: {
        backgroundColor: 'white',
        padding: 16,
    },
    Done: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#5E4EA0',
        fontWeight: '700',
    },
    EditBio: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#000',
        fontWeight: '700',
    },
    TitleCancel: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#000',
        fontWeight: '400',

    },
    HeaderBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
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
        width: 220,
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
    ProfileCard: {
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
    }
})