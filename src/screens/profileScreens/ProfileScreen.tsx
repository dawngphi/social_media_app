import { ScrollView, Animated, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import HeaderProfile from './component/HeaderProfile';
import ProfileUser from './component/ProfileUser';
import TopTabProfile from './component/TopTabProfile';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigatorProps } from '@/navigation/ProfileNavigator/config';
import { ProfileStackNames } from '@/navigation/ProfileNavigator/config';
import { useTranslation } from 'react-i18next';
const ProfileScreen = () => {
  const {t} = useTranslation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<ProfileNavigatorProps>();
  const translateY = scrollY.interpolate({
    inputRange: [0, 550],
    outputRange: [0, -373],
    extrapolate: 'clamp',
  });

  const handlePressMenu = () => {
    navigation.navigate(ProfileStackNames.Setting);
  }
  const handlePressEditProfile = () => {
    navigation.navigate(ProfileStackNames.EditProfile);
  }
  // Giả sử chiều cao của HeaderProfile là 60
  const headerHeight = 50;

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <HeaderProfile   onPressMenu={handlePressMenu} nameTitle={t("Profile")} iconTick={true} />
      </View>
      <View style={{flex:1,}}>
        <Animated.View style={{ transform: [{ translateY }], marginTop: headerHeight }}>
          <View style={styles.profileUserContainer}>
            <ProfileUser onPressEditProfile={handlePressEditProfile} />
          </View>
          <View style={{ height: "100%" }}>
            <TopTabProfile scrollY={scrollY} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileUserContainer: {
   // Ensure the profile user stays above the tabs when scrolling
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3, // Ensure the header stays above everything
  },
});