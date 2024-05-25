import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


const Search = () => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');
    const clearInput = () => {
        setInputValue('');
    };
    return (
        <View style={styles.Container}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9F9F9F" />
            <TextInput
                placeholder={t('Search')}
                value={inputValue}
                onChangeText={setInputValue}
                style={styles.TextInputStyle} />
            {inputValue && (
                <TouchableOpacity onPress={clearInput}>
                    <FontAwesomeIcon icon={faCircleXmark} size={20} color="#767676" />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    TextInputStyle: {
        lineHeight: 21,
        fontSize: 15,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#000',
        width: 305,
        marginLeft: 16,
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 36,
    },
})