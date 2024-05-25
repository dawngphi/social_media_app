import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/theme'
import Svg3dot from '@/assets/icons/iconSVG/3dot'
import { icons } from '@/assets'
import { images } from '@/assets'
import SvgStar from '@/assets/icons/iconSVG/Star'
import SvgStar2 from '@/assets/icons/iconSVG/Star2'
import SvgComponent from '@/assets/icons/iconSVG/Comments'
import SvgSwitch from '@/assets/icons/iconSVG/Switch'
import SvgSend from '@/assets/icons/iconSVG/Send'




interface CartCommentsProps {
    avatar?: any,
    hour?: string,
    title?: string,
    onPress?: () => void,
    description?: string,
    star?: number,
    comment?: number,
    share?: number,
    onPressDetail?: () => void,
    onPressSwitch?: () => void

}
const CartComments: React.FC<CartCommentsProps> = ({ ...props }) => {
    const [like, setlike] = useState<boolean>(false);
    const handleLike = () => {
        setlike(!like);
        console.log(like)
    }
    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ width: 450, height: 1, borderWidth: 0.1, backgroundColor: "#E3E3E3" }} />
            <View style={{ flexDirection: "row", padding: 20 }}>
                <Image style={styles.imgCar} source={props.avatar} />
                <View>
                    <View style={styles.containerTick}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: colors.black }}>{props.title}</Text>
                        <Image style={{ width: 20, height: 20, marginStart: 4 }} source={icons.tick} />
                        <TouchableOpacity onPress={props.onPress} style={{ position: "absolute", marginStart: 290 }}>
                            <Svg3dot />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 12, marginStart: 10, marginTop: 3 }}>{props.hour}</Text>
                </View>
            </View>
            <Text style={styles.description}>{props.description}</Text>
            <View style={styles.containerAction}>
                <TouchableOpacity onPress={handleLike}>
                    {like ? <SvgStar2 /> : <SvgStar />}
                </TouchableOpacity>
                <Text style={styles.textAction}>{props.star}</Text>
                <TouchableOpacity onPress={props.onPressDetail} style={styles.space}>
                    <SvgComponent />
                </TouchableOpacity>
                <Text style={styles.textAction}>{props.comment}</Text>
                <TouchableOpacity onPress={props.onPressSwitch} style={styles.space}>
                    <SvgSwitch />
                </TouchableOpacity>
                <Text style={styles.textAction}>{props.share}</Text>
                <TouchableOpacity style={styles.space}>
                    <SvgSend />
                </TouchableOpacity>
            </View>

        </View>


    )
}

export default CartComments

const styles = StyleSheet.create({
    space: {
        marginStart: 20
      },
      textAction: {
        fontSize: 14,
        color: colors.black,
        marginStart: 8
      },
      containerAction: {
        flexDirection: "row",
        marginTop: 16,
        marginStart: 20,
        marginBottom: 12
      },
    description: {

        fontSize: 16,
        fontWeight: "400",
        color: colors.black,
        marginStart: 20,
        width: 359

    },
    containerTick: {
        flexDirection: "row",
        marginStart: 12
    },
    imgCar: {
        width: 46,
        height: 46,
        borderRadius: 20,
    }
})
