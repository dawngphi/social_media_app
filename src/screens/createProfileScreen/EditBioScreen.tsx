import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBarEditBio from '@/screens/createProfileScreen/component/HeaderBarEditBio'
import BioCard from './component/BioCard'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LoginStackParamList } from '@/navigation/login'

const EditBioScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const [saveBioCallback, setSaveBioCallback] = useState<((bio: string) => void) | null>(null);
  const [numberText, setNumberText] = useState('');

  useEffect(() => {
    const routeParams = navigation.getState().routes.find(route => route.name === 'EditBioScreen')?.params as { onSaveBio?: (newBio: string) => void };
    if (routeParams?.onSaveBio) {
      setSaveBioCallback(() => routeParams.onSaveBio);
    }
  }, [navigation]);

  const goBackWithSave = () => {
    if (saveBioCallback && numberText) {
      saveBioCallback(numberText);
    }
    navigation.goBack();
  };
  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.Container}>
      <HeaderBarEditBio backProfile='Cancel' title='EditBio' done='Done' onPressBack={goBack} onPressDone={goBackWithSave}/>
      <BioCard title='Bio' placeholder='Write a Bio...' value={numberText} onChangeText={setNumberText}/>
    </View>
  )
}

export default EditBioScreen

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
})