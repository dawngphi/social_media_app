import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '@/theme'
import Svg99 from '@/assets/icons/iconSVG/99'
import SvgSwitchBlack from '@/assets/icons/iconSVG/SwitchBlack'

interface BottomSheetSwitchProps {
    onPressReport?: () => void,
    onPressCaption?: () => void,
}
const BottomSheetSwitch: React.FC<BottomSheetSwitchProps> = ({ ...props }) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.follow} onPress={props.onPressReport}>
                <Text style={styles.textFollow}>Report</Text>
                <SvgSwitchBlack style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.follow,{marginTop:16}]} onPress={props.onPressCaption}>
                <Text style={styles.textFollow}>Caption</Text>
                <Svg99 style={styles.img} />
            </TouchableOpacity>
        </View>
    )
}
export default React.memo(BottomSheetSwitch)

const styles = StyleSheet.create({
    img: {
        marginEnd: 24
    },
    container: {
        width: 407,
        height: 255,
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
    },
    follow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.greyLight,
        borderRadius: 10,
        width: 330,
        height: 50,
        alignSelf: "center",
        justifyContent: "space-between",

    },
    textFollow: {
        fontSize: 18,
        fontWeight: "400",
        color: colors.black,
        marginStart: 20,
    }

})
