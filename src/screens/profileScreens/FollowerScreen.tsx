import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchComponent from '../searchScreen/component/SearchComponent'
import UserItem from '../createProfileScreen/component/UserItem'
import AxiosInstance from '@/network/axiosInstance'
import {useAppSelector} from '@/redux/store';
import {userInfoSelector} from '@/redux/test/userStore';
import { ProfileNavigatorProps } from '@/navigation/ProfileNavigator/config';
import { ProfileStackNames } from '@/navigation/ProfileNavigator/config';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/slice/app.slice'
const axios = AxiosInstance();


const FollowerScreen = () => {
    const navigation = useNavigation<ProfileNavigatorProps>();
    const userInfor = useAppSelector(userInfoSelector);
    const [listData, setListData] = useState<any[]>([]);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    console.log(userInfor._id);
    useEffect(() => {
        if(isFocused){
        getFollowers();
        }
      }, [userInfor._id, isFocused]);

    const getFollowers = async () => {
        try {
            dispatch(setLoading(true));
          const response = await axios.get(`user/follower/${userInfor._id}`);
          setListData(response.data);
          return response.data;
        } catch (error) {
          console.log(error);
        }finally{
            dispatch(setLoading(false));
        }
      };
    const onPressProfileUser = (id: string, userName: string) => {
        navigation.navigate(ProfileStackNames.UserProfileDetail, { userId: id, userName: userName });
        console.log(id);
    };


    return (
        <View style={styles.Container}>
        <View style={styles.UserContainer}>
            {listData.map((item, index) => {
                return <UserItem
                    key={item.following._id} // Sử dụng _id làm key cho mỗi item
                    id={item.following._id}
                    avatar={item.following.avatar}
                    fullName={item.following.fullName}
                    nameUser={item.following.userName}
                    followingStatus={item.isFollowing}
                    onPress={() => onPressProfileUser(item.following._id, item.following.userName)}
                />
            })}
        </View>
    </View>
    )
}

export default FollowerScreen

const styles = StyleSheet.create({
    UserContainer:{
        padding:16,
    },
    SearchContainer: {
        paddingHorizontal: 16,
    },
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})