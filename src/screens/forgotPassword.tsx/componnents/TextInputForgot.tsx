import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@/theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

interface TextInputProps {
  placeholder: string;
  title: string;
  iconType?: 'email' | 'password';
  showIcon?: boolean;
  style?: any;
  value?: string;
  onChangeText?: (text: string) => void;
}

const TextInputForgot: React.FC<TextInputProps> = ({
  placeholder,
  title,
  iconType,
  showIcon = true,
  style,
  value,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[styles.textInputContainer, style]}>
      <Text style={[styles.title]}>{title}</Text>
      {showIcon && iconType === 'email' && (
        <FontAwesomeIcon
          icon={faEnvelope}
          size={15}
          color="#000"
          style={styles.icon}
        />
      )}
      {showIcon && iconType === 'password' && (
        <FontAwesomeIcon
          icon={faLock}
          size={15}
          color="#000"
          style={styles.icon}
        />
      )}
      <TextInput
        secureTextEntry={iconType === 'password' && !showPassword}
        style={{
          height: 60,
          backgroundColor: colors.greyLight,
          borderRadius: 10,
          marginTop: 10,
          paddingLeft: 40,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {iconType === 'password' && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={15}
            color="#000"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInputForgot;

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
    marginTop: 30,
  },
});
