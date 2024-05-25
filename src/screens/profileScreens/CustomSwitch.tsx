import React, { useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/redux/slice/language.slice';
import { useTranslation } from 'react-i18next';



interface CustomSwitchProps {
    textOn?: string;
    textOff?: string;
    iconOn?: React.ReactNode;
    iconOff?: React.ReactNode;
    onValueChange?: (isEnabled: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({textOn, textOff, iconOn, iconOff, onValueChange}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const handleChangeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        dispatch(setLanguage(newLang));
        i18n.changeLanguage(newLang);
    }

    const toggleSwitch = () => {
        handleChangeLanguage();
        setIsEnabled(previousState => !previousState);
        const newState = !isEnabled; // Lưu trạng thái mới vào biến tạm
        setIsEnabled(newState); // Cập nhật trạng thái isEnabled
        Animated.timing(animatedValue, {
            toValue: isEnabled ? 0 : 1,
            duration: 250,
            useNativeDriver: false,
        }).start();

        if (onValueChange) {
            onValueChange(newState); // Gọi hàm onValueChange với trạng thái mới
        }
    };

    const switchTranslate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 23], // Adjust these values according to the size of your switch
    });

    return (
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
                    {isEnabled ? (iconOn ? iconOn : <Text style={styles.switchText}>{textOn}</Text>) : (iconOff ? iconOff : <Text style={styles.switchText}>{textOff}</Text>)}
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
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
});

export default CustomSwitch;
