import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconRinged from '@/assets/icons/IconRinged';
import IconMenu from '@/assets/icons/IconMenu';
import Icontick from '@/assets/icons/Icontick';
import { icon } from '@fortawesome/fontawesome-svg-core';
import Svgback from '@/assets/icons/iconSVG/Back';
import { useNavigation } from '@react-navigation/native';
interface HeaderProfileProps {
    userId?:string,
    isMine?: boolean;
    nameTitle?: string;
    iconTick?: boolean;
    onPressMenu?: () => void,
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({ nameTitle, iconTick, isMine,onPressMenu }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack();
            }}>
               {
                     isMine ? <IconRinged /> : <Svgback/>
               }
            </TouchableOpacity>
            <View style={styles.NameTitleContainer}>
                <Text style={styles.NameTitle}>{nameTitle}</Text>
            </View>
            <TouchableOpacity onPress={onPressMenu} >
                <IconMenu />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderProfile

const styles = StyleSheet.create({
    IconStyle:{
        marginLeft: 8,
    },
    NameTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    NameTitle: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#2C2B2B',
        textAlign: 'center',
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        flex:1,
        backgroundColor: 'white',
    },
})