import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from './component/HeaderBar'
import ButtonSwitch from './component/ButtonSwitch'
import IconRinged from '@/assets/icons/IconRinged'
import IconPrivacy from '@/assets/icons/IconPrivacy'
import { RadioButton } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const AccountScreen = () => {
    const [checked, setChecked] = useState('10minutes');
    return (
        <View style={styles.Container}>
            <HeaderBar title='Account' />
            <View style={styles.OptionContainer}>
                <Text style={styles.TextStyle1}>Get a reminder to take a break</Text>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Every 10 minutes</Text>
                    <RadioButton
                        value="10minutes"
                        status={checked === '10minutes' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('10minutes')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Every 20 minutes</Text>
                    <RadioButton
                        value="20minutes"
                        status={checked === '20minutes' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('20minutes')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Every 30 minutes</Text>
                    <RadioButton
                        value="30minutes"
                        status={checked === '30minutes' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('30minutes')}
                    />
                </View>
                <View style={styles.LineStyle}></View>
                <View style={styles.TextOptionStyle}>
                    <Text style={styles.TextStyle2}>Never</Text>
                    <RadioButton
                        value="never"
                        status={checked === 'never' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('never')}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.OptionContainer, {flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
                <Text style={[styles.TextStyle2, {marginLeft:10}]}> Deactivate profile</Text>
                <FontAwesomeIcon icon={faChevronRight} size={15} color="#000" style={{ marginRight: 26 }} />
            </TouchableOpacity>
        </View>
    )
}

export default AccountScreen

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
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})