import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Children} from 'react';

interface ButtonBottomProps {
  title: string;
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
  style?: any;
  children?: React.ReactNode;
}

const ButtonBottom: React.FC<ButtonBottomProps> = ({
  title,
  backgroundColor,
  color,
  onPress,
  style,
  children,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.Container, {backgroundColor: backgroundColor}, style]}>
        <Text style={[styles.TitleStyle, {color: color}]}>{title}</Text>
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBottom;

const styles = StyleSheet.create({
  TitleStyle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  Container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#5E4EA0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
