import React, { useState, forwardRef } from 'react';
import { StyleSheet, Text, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faVenusMars, faCakeCandles, faUser } from '@fortawesome/free-solid-svg-icons';

interface TextInputSignInProps {
    placeholder: string,
    title: string,
    iconType?: 'email' | 'password' | 'birthday' | 'name' | 'sex',
    showIcon?: boolean,
    value?: string,
    onChangeText?: (text: string) => void,
    style?: any
}

const TextInputSignIn = forwardRef<RNTextInput, TextInputSignInProps>(
    ({ placeholder, title, iconType, showIcon = true, value, onChangeText, style }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <View style={styles.textInputContainer}>
                <Text style={styles.title}>{title}</Text>
                {showIcon && iconType === 'email' && (
                    <FontAwesomeIcon icon={faEnvelope} size={15} color="#000" style={styles.icon} />
                )}
                {showIcon && iconType === 'birthday' && (
                    <FontAwesomeIcon icon={faCakeCandles} size={15} color="#000" style={styles.icon} />
                )}
                {showIcon && iconType === 'sex' && (
                    <FontAwesomeIcon icon={faVenusMars} size={15} color="#000" style={styles.icon} />
                )}
                {showIcon && iconType === 'name' && (
                    <FontAwesomeIcon icon={faUser} size={15} color="#000" style={styles.icon} />
                )}
                {showIcon && iconType === 'password' && (
                    <FontAwesomeIcon icon={faLock} size={15} color="#000" style={styles.icon} />
                )}
                <RNTextInput
                    ref={ref}
                    secureTextEntry={iconType === 'password' && !showPassword}
                    style={[{ height: 60, backgroundColor: colors.greyLight, borderRadius: 10, marginTop: 10, paddingLeft: 40 }, style]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
                {iconType === 'password' && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={15} color="#000" />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
);

export default TextInputSignIn;

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 54,
        left: 10,
        zIndex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        top: 54,
        right: 15,
        zIndex: 1,
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInputContainer: {
        marginTop: 20,
    },
});