import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/theme';
import React from 'react';
import {icons} from '@/assets';
import {useAppSelector} from '@/redux/store';
import {userInfoSelector} from '@/redux/test/userStore';

const UserInfo = () => {
  const userInfo = useAppSelector(userInfoSelector);

  return (
    <View style={styles.userInfo}>
      <Image source={{uri: userInfo.avatar}} style={styles.avatar} />
      <Text style={styles.usernameText}>{userInfo.fullName}</Text>
      {userInfo.accountType === 1 ? (
        <Image source={icons.tick} style={styles.tick} />
      ) : (
        <View />
      )}
    </View>
  );
};
export default UserInfo;

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    marginRight: 8,
    color: colors.neutralBlack,
  },
  tick: {
    width: 16,
    height: 16,
  },
});
