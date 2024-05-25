import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from './component/HeaderBar'
import ButtonSwitch from './component/ButtonSwitch'
import IconRinged from '@/assets/icons/IconRinged'
import IconPrivacy from '@/assets/icons/IconPrivacy'
import { RadioButton } from 'react-native-paper'

const NotificationScreen = () => {
    const [checked1, setChecked1] = useState('everyone');
    const [checked2, setChecked2] = useState('everyone');
    const [checked3, setChecked3] = useState('everyone');

    const handleToggle = (isActive: boolean) => {
        const newState = isActive ? 'everyone' : 'noone';
        setChecked1(newState);
        setChecked2(newState);
        setChecked3(newState);
    };
    return (
        <ScrollView
        style={{ backgroundColor: '#fff' }}
            showsVerticalScrollIndicator={false}>
            <HeaderBar title="Notifications" />
            <ButtonSwitch title='Pause All' textOn='On' textOff='Off' onToggle={handleToggle}/>
            <View style={styles.OptionContainer}>
                <Text style={styles.TextStyle1}>Verses and replies</Text>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>From everyone</Text>
                    <RadioButton
                        value="everyone"
                        status={checked1 === 'everyone' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked1('everyone')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Profiles you follow</Text>
                    <RadioButton
                        value="followed"
                        status={checked1 === 'followed' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked1('followed')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Off</Text>
                    <RadioButton
                        value="noone"
                        status={checked1 === 'noone' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked1('noone')}
                    />
                </View>
            </View>
            <View style={styles.OptionContainer}>
                <Text style={styles.TextStyle1}>New followers</Text>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>On</Text>
                    <RadioButton
                        value="everyone"
                        status={checked2 === 'everyone' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked2('everyone')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Off</Text>
                    <RadioButton
                        value="noone"
                        status={checked1 === 'noone' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked1('noone')}
                    />
                </View>
            </View>
            <View style={styles.OptionContainer}>
                <Text style={styles.TextStyle1}>New followers</Text>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>On</Text>
                    <RadioButton
                        value="everyone"
                        status={checked3 === 'everyone' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked3('everyone')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Off</Text>
                    <RadioButton
                        value="noone"
                        status={checked1 === 'noone' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked1('noone')}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    TextStyle2: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#2C2B2B',
    },
    TextOptionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingVertical: 12,
    },
    LineStyle: {
        height: 1,
        backgroundColor: '#F1F1F1',
    },
    TextStyle1: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#2C2B2B',
        marginHorizontal: 16,
        paddingVertical: 12,
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