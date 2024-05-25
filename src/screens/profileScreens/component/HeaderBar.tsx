import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { use } from 'i18next'
import { useTranslation } from 'react-i18next'

interface HeaderBarProps {
    title: string
}

const HeaderBar:React.FC<HeaderBarProps> = ({title}) => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style = {styles.BackStyle}>
                <FontAwesomeIcon icon={faChevronLeft} size={15} color="#000" />
                <Text style = {styles.BackTextStyle}>{t("Back")}</Text>
            </TouchableOpacity>
            <Text style = {styles.SettingTextStyle}>{title}</Text>
            <View style={{ width: 48 }}></View>
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({
    SettingTextStyle:{
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
    },
    BackTextStyle:{
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#000',
        marginLeft: 8,
    },
    BackStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    Container: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
})