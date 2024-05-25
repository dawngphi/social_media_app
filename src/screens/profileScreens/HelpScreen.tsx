import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from './component/HeaderBar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import TextInputSignIn from '../sign_inScreen/components/TextInput'
import TextInputSignIn2 from '../sign_up/components/TextInput'
import ButtonBottom from '../createProfileScreen/component/ButtonBottom'
import { useTranslation } from 'react-i18next'
import { changePassword } from '@/network/callAPI'
import {setUser} from '@/redux/slice/user.slice';
import {setLoading} from '@/redux';
import {useAppDispatch} from '@/redux/store';
import {colors} from '@/theme';
import CustomToast from '@/components/Toast/CutomToast';
import Toast from 'react-native-toast-message';



const HelpScreen = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [oldPass, setoldPass] = useState("");
    const [newPass, setnewPass] = useState("");
    const handleChangePass = async () => {
        dispatch(setLoading(true));
        try {
            const response = await changePassword(oldPass, newPass);
            CustomToast({
                type: 'success',
                message: t('Change password success'),
            });
        } catch (error) {
            console.error('Change password error:', error);
            CustomToast({
                type: 'error',
                message: t('Change password error'),
            });
        }finally{
            dispatch(setLoading(false));
        }
    }
    const toastConfig = {
        success: (props: any) => (
          <View style={styles.CustumToast}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                alignSelf: 'center',
                fontWeight: '600',
              }}>
              {props.text1}
            </Text>
          </View>
        ),
        error: (props: any) => (
          <View style={styles.CustumToast2}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                alignSelf: 'center',
                marginStart: 10,
              }}>
              {props.text1}
            </Text>
          </View>
        ),
      };
    return (
        <View style={styles.Container}>
            <HeaderBar title="Change Password" />
            <View style={styles.container3}>
                <TextInputSignIn2
                    placeholder="Password"
                    title="Old Password"
                    showIcon
                    iconType='password'
                    onChangText={(text: string) => setoldPass(text)}
                    value={oldPass} />
                <TextInputSignIn2
                    placeholder="Password"
                    title="New Password"
                    showIcon
                    iconType='password'
                    onChangText={(text: string) => setnewPass(text)}
                    value={newPass} />
                <View style={{ marginTop: 400 }}>
                    <ButtonBottom title={t('Change Pass')} backgroundColor='#5E4EA0' color='#FFFFFF' onPress={handleChangePass} />
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    )
}

export default HelpScreen

const styles = StyleSheet.create({
    CustumToast2: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        width: 356,
        height: 70,
        borderLeftColor: colors.red,
        borderRightColor: colors.red,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        justifyContent: 'center',
      },
      CustumToast: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        width: 356,
        height: 70,
        borderLeftColor: colors.purple,
        borderLeftWidth: 4,
        justifyContent: 'center',
        borderRightColor: colors.purple,
        borderRightWidth: 4,
      },
    container3: {
        padding: 16
    },
    LineStyle: {
        height: 1,
        backgroundColor: '#F1F1F1',
    },
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    TextStyle2: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#2C2B2B',
        textAlign: 'center',
    },
    OptionContainer: {
        margin: 16,
        marginTop: 26,
        borderRadius: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
    },
})