import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchComponent from './component/SearchComponent'
import UserItemSearch from './component/UserItemSearch'
import AxiosInstance from '@/network/axiosInstance'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { SearchStackNames } from '@/navigation/SearchNavigator/config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native'
import HistorySearch from './component/HistorySearch'
import { formatPostTime } from '@/utils/time';
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/slice/app.slice'
import { useTranslation } from 'react-i18next'
const axios = AxiosInstance();



const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [textInput, setTextInput] = useState('')
  const isFocusedReLoad = useIsFocused();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    if (isFocusedReLoad) {
      dispatch(setLoading(true));
    const fetchData = async (text : string) => {
      dispatch(setLoading(true));
      const result = await axios.get(`/user/s/search/history`);
      setData(result.data);
      dispatch(setLoading(false));
      console.log('result: ', result);
    };
    try {
      fetchData(text);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      dispatch(setLoading(false));
    }
    }
    
  }, [text, isFocusedReLoad]);
  const [isFocused, setIsFocused] = useState(false); // Trạng thái để theo dõi sự focus

  const clearInput = () => {

    Keyboard.dismiss();
  };
  const onPressDelete = async (id: string) => {
    try {
      const result: any = await axios.delete(`/user/deleteSearchHistory/${id}`);
      if (result.message.includes("success") ) {
        // Cập nhật state để loại bỏ mục đã xóa khỏi giao diện
        const result = await axios.get(`/user/s/search/history`);
        setData(result.data);
        console.log('result: ', result);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const onPressSearch = (searchText: string) => {
    navigation.navigate(SearchStackNames.ResultSearch, { searchText: searchText });
    console.log(searchText, 'onPressSearch');
  }

  return (
    <View style={styles.Container}>
      <View style={styles.SearchContainer}>
        <View style={styles.containerSearch}>
          <View style={[styles.searchContainer, isFocused ? styles.focusedSearchContainer : null]}>
            <TouchableOpacity onPress={() => onPressSearch(textInput)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9F9F9F" />
            </TouchableOpacity>
            <TextInput
              placeholder={t("Search")}
              value={textInput}
              onEndEditing={() => onPressSearch(textInput)}
              onChangeText={(text) => setTextInput(text)}
              onFocus={() => setIsFocused(true)} // Cập nhật trạng thái khi được focus
              onBlur={() => setIsFocused(false)} // Cập nhật trạng thái khi mất focus
              style={styles.textInputStyle}
            />
            <TouchableOpacity onPress={clearInput}>
              <FontAwesomeIcon icon={faCircleXmark} size={20} color="#767676" />
            </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={clearInput} style={styles.cancelButton}>
            <Text style={styles.cancelText}>{t("Cancel")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Line}></View>
      <Text style = {styles.titleHistorySearch}>{t("Search history")}</Text>
      <View >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <HistorySearch
              titleSearch={item.search}
              timeHistory= {formatPostTime(item.createdAt)}
              onPressDelete={() => onPressDelete(item._id)}
              onPressSearch={() => onPressSearch(item.search)}
            />
          )}
          contentContainerStyle={styles.UserItemContainer}
        />
      </View>

    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  titleHistorySearch:{
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#000000',
    marginLeft: 16,
  },
  cancelText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  containerSearch: {
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
  UserItemContainer: {
    padding: 16,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 16,
  },
  SearchContainer: {
    padding: 16,
  },
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})