import { animations } from '@/assets';
import LottieView from 'lottie-react-native';
import React from 'react';
import {View,StyleSheet} from 'react-native';
const FooterList = () => {
  return <View style={styles.container}>
        <LottieView style={{
            width:50,
            height:50
        }} autoPlay source={animations.listLoading} />
  </View>;
};

export default FooterList;
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        height:48,
    }
})
