import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import HeaderBarEditBio from '@/screens/createProfileScreen/component/HeaderBarEditBio'
import BioCard from './component/BioCard'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LoginStackParamList } from '@/navigation/login'

const EditLinkScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
  const [saveLinkCallBack, setsaveLinkCallBack] = useState<((bio: string) => void) | null>(null);
  const [numberText, setNumberText] = useState('');
  const routeParams = navigation.getState().routes.find(route => route.name === 'EditLinkScreen')?.params as { onSaveLink?: (newLink: string) => void };
  console.log(routeParams, 'routeParams');
  useEffect(() => {
    const routeParams = navigation.getState().routes.find(route => route.name === 'EditLinkScreen')?.params as { onSaveLink?: (newLink: string) => void };
    if (routeParams?.onSaveLink) {
      setsaveLinkCallBack(() => routeParams.onSaveLink);
    }
  }, [navigation]);

  const goBackWithSave = () => {
    if (saveLinkCallBack && numberText) {
      saveLinkCallBack(numberText);
    }
    navigation.goBack();
  };
  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style = {styles.Container}>
      <HeaderBarEditBio backProfile='Cancel' title='EditLink' done='Done' onPressBack={goBack} onPressDone={goBackWithSave}/>
      <BioCard title='Link' placeholder='Write a Link...' value={numberText} onChangeText={setNumberText}/>  
    </View>
  )
}

export default EditLinkScreen

const styles = StyleSheet.create({
  
  Container:{
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
})