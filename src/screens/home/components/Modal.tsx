import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
// import {animations,images} from '@/assets';
import { images } from '@/assets';
import { colors } from '@/theme';
import { useTranslation } from 'react-i18next';



const Modal1 = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {t} = useTranslation();
  useEffect(() => {
    setModalVisible(true);
  }, []);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Image
              source={images.thumnail}
              style={styles.modalImage}
            />
            <Image source={images.stars} style={styles.stars} />
            <Text style={styles.text}>
              {t('We verse with Stars')}
            </Text>
            <Text style={styles.text2}>
              {t('No more boring heart engagement')}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>{t('Let’s get in')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default React.memo(Modal1)

const styles = StyleSheet.create({
  text2: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 15
  },
  text: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15
  },
  stars: {
    width: 327,
    height: 246,
    position: 'absolute',
    top: 196
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 358,
    height: 521,
    margin: 20,
    backgroundColor: colors.purple,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 260,
    height: 260,
    marginBottom: 15,
  },
  button: {
    borderRadius: 32,
    padding: 10,
    elevation: 2,
    marginTop: 30,
    width: 142,
    height:51,
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: colors.pink,
  },
  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
    
  },
});