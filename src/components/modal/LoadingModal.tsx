import {animations} from '@/assets';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Modal, StyleSheet, View} from 'react-native';
type LoadingModalProps = {
  visible: boolean;
};
export const LoadingModal = ({visible}: LoadingModalProps) => {
  return (
    <Modal statusBarTranslucent transparent visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          style={styles.loadingAnimation}
          source={animations.loading}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
});
