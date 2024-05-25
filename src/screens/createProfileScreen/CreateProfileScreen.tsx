import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ProfileCard from '@/screens/createProfileScreen/component/ProfileCard'
import ButtonBottom from '@/screens/createProfileScreen/component/ButtonBottom'
import { LinearTextGradient } from 'react-native-text-gradient'
import HeaderBarEditProfile from '@/screens/createProfileScreen/component/HeaderBarEditProfile'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LoginStackEnum, LoginStackParamList } from '@/navigation/login'
import { useTranslation } from 'react-i18next'
import { AppStackNames } from '@/navigation/config'

const CreateProfileScreen = () => {

  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleNext = () => {
      navigation.navigate(AppStackNames.HomeBottomTab, { screen: 'Home'})
  }
  return (
    <View style={styles.CreateProfileContainer}>
      <View>
        <HeaderBarEditProfile
        onPressNext={handleNext}
          next={t('Skip')}
          IconNextComponent={<FontAwesomeIcon icon={faChevronRight} size={15} color="#000" style={{ marginLeft: 8 }} />} />
        <View style={styles.TitleProfileContainer}>
          <Text
            style={styles.TitleProfile}>{t('Profile')}</Text>
          <Text style={styles.TitleProfileCustomize}>{t('Customize your VNPIC profile')}</Text>
        </View>
        <ProfileCard/>
      </View>
      <View>
        {/* <ButtonBottom title={t('Next')} backgroundColor='#5E4EA0' color='#FFFFFF' onPress={goNext}/> */}
      </View>
      
    </View>
  )
}

export default CreateProfileScreen

const styles = StyleSheet.create({
  TitleProfileCustomize: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#767676',
    marginTop: 12,
  },
  TitleProfile: {
    fontSize: 32,
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginTop: 90,
    color: '#5E4EA0',
  },
  TitleProfileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  SkipTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#000',
    fontWeight: '400',
    marginRight: 8,
  },
  SkipContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  CreateProfileContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'space-between',
  }
})