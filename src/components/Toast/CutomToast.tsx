import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { toastType } from './Toast';

interface CustomToastProps {
  type: 'success' | 'error';
  message: any;
}

const CustomToast = ({type, message}: CustomToastProps) => {
  Toast.show({
    type: type,
    text1: message,
    visibilityTime: 2000,
    autoHide: true,
  });
};
export default CustomToast;
export const ShowNoti = ({message, avatar}: any) => {

};
