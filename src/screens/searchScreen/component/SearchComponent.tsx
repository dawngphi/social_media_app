import { StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type SearchComponentProps = {
    searchText: string;
    onChangeText: (text: string) => void;
    onPress?: () => void;
    navigation: NativeStackNavigationProp<any>;
};


const SearchComponent: React.FC<SearchComponentProps> = ({ searchText, onChangeText, onPress, navigation }) => {

    const [isFocused, setIsFocused] = useState(false); // Trạng thái để theo dõi sự focus
    const [inputText, setInputText] = useState(searchText);
    const clearInput = () => {

        Keyboard.dismiss();
        setInputText('');
        onChangeText('');
    };

    const handleSearchPress = () => {
        if (inputText.trim() === '') {
            navigation.goBack(); // Quay lại màn hình trước nếu ô tìm kiếm rỗng
        } else {
            onChangeText(inputText); // Cập nhật trạng thái text khi nhấn nút tìm kiếm
            if (onPress) {
                onPress();
            }
        }
    };
    return (
        <View style={styles.container}>
            <View style={[styles.searchContainer, isFocused ? styles.focusedSearchContainer : null]}>
                <TouchableOpacity onPress={handleSearchPress}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9F9F9F" />
                </TouchableOpacity>
                <TextInput
                    placeholder="Search"
                    value={inputText}
                    onEndEditing={handleSearchPress}
                    onChangeText={setInputText}
                    onFocus={() => setIsFocused(true)} // Cập nhật trạng thái khi được focus
                    onBlur={() => setIsFocused(false)} // Cập nhật trạng thái khi mất focus
                    style={styles.textInputStyle}

                />
                {searchText && (
                    <TouchableOpacity onPress={clearInput}>
                        <FontAwesomeIcon icon={faCircleXmark} size={20} color="#767676" />
                    </TouchableOpacity>
                )}
            </View>
            {searchText && (
                <TouchableOpacity onPress={clearInput} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    cancelText: {
        color: '#000000',
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'Roboto',
        fontWeight: '400',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        paddingHorizontal: 16,
        flex: 1,
        borderWidth: 1, // Thêm viền
        borderColor: '#F7F7F7', // Màu viền mặc định
    },
    focusedSearchContainer: {
        borderColor: '#E693BF', // Màu viền khi được focus
    },
    textInputStyle: {
        lineHeight: 21,
        fontSize: 15,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#000',
        marginLeft: 16,
        flex: 1,
    },
    cancelButton: {
        marginLeft: 10,
    },
})