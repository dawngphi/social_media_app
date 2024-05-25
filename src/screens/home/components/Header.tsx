import React, { useRef, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { icons } from '@/assets';
import { colors } from '@/theme';

interface Props {
    onPressToggle?: () => void;
}
const Header:React.FC<Props> = ({onPressToggle}) => {
    return (
   
            <View style={styles.container}>
                <Image style={styles.logo} source={icons.logo_vnpic} />
                <TouchableOpacity onPress={onPressToggle}>
                    <Image style={styles.backup} source={icons.backup} />
                </TouchableOpacity>
            </View>
    );
};

export default React.memo(Header);

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.5,
    },
    textWorl: {
        marginStart: 16,
        fontSize: 18,
        color: colors.purple,
        fontWeight: "400"
    },
    radio1: {
        width: 10,
        height: 10,
        backgroundColor: colors.pink,
        borderRadius: 15,
        margin: 3
    },
    radioButton: {
        marginLeft: 171,
        top: 3
    },
    radio: {
        width: 20,
        height: 20,
        borderColor: colors.pink,
        borderWidth: 2,
        borderRadius: 15,
    },
    text: {
        marginStart: 12,
        fontSize: 24,
        color: colors.purple,
        fontWeight: "700"
    },
    pick: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 25,
        height: 24,
    },
    contentContainer: {
        width: 407,
        height: 255,
        padding: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,

    },
    logo: {
        width: 40,
        height: 40,
    },
    backup: {
        width: 25,
        height: 24,
        marginTop: 5,
    },
});