import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchComponent from './component/SearchComponent'
import UserItemSearch from './component/UserItemSearch'
import AxiosInstance from '@/network/axiosInstance'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { SearchStackNames, SearchStackParamList } from '@/navigation/SearchNavigator/config'
import { RouteProp } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
const axios = AxiosInstance();


type UserProfileDetailRouteProp = RouteProp<SearchStackParamList, SearchStackNames.ResultSearch>;
const ResultSearch = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<UserProfileDetailRouteProp>();
  const { searchText } = route.params;
  console.log('searchTextasd: ', searchText);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(searchText);
  useEffect(() => {
    if (text === '') {
      navigation.goBack();
    } else {
      setLoading(true);
      const fetchData = async (text: string) => {
        setLoading(true);
        const result = await axios.get(`/user/s/search?q=${text}`);
        setData(result.data);
        setLoading(false);
        console.log('result: ', result);
      };
      try {
        fetchData(text);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setLoading(false);
      }
    }
  }, [text]);
  const onPressResultSearch = (userId: string, userName: string) => {
    navigation.navigate(SearchStackNames.UserProfileDetail, { userId: userId, userName: userName });
  }

  return (
    <View style={styles.Container}>
      <View style={styles.SearchContainer}>
        <SearchComponent searchText={text} onChangeText={(text) => setText(text)} navigation={navigation} />
      </View>
      <View style={styles.Line}></View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length === 0 ? (
        <Text style={styles.NoResultsText}>Không tìm thấy kết quả</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <UserItemSearch
              key={item.id}
              nameUser={item.userName}
              fullName={item.fullName}
              icontick={item.icontick}
              avatar={item.avatar}
              followersCount={item.following_status}
              onPress={() => onPressResultSearch(item._id, item.userName)}
            />
          )}
          contentContainerStyle={styles.UserItemContainer}
        />
      )}
    </View>
  )
}

export default ResultSearch

const styles = StyleSheet.create({
  NoResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'grey'
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