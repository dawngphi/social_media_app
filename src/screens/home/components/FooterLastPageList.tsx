import {animations} from '@/assets';
import {text} from '@fortawesome/fontawesome-svg-core';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const FooterLastPageList = () => {
  return (
    <TouchableOpacity style={styles.container}>
        <Text style={styles.text1}>Không có tin mới</Text>
      <Text style={styles.text2}>Làm mới bảng tin của bạn ngay</Text>
      <LottieView
        style={{
          width: 40,
          height: 40,
        }}
        autoPlay
        source={animations.refresh}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  text1: {
    fontWeight: '400',
    fontSize: 14,
    color: '#767676',
  },
  text2: {
    color: '#9999c3',
    fontSize: 14,
    fontWeight: '800',
  },
});
export default FooterLastPageList;
