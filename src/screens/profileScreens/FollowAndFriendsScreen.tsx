import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from './component/HeaderBar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FollowerScreen from './FollowerScreen'
import FollowingScreen from './FollowingScreen'


const Tab = createMaterialTopTabNavigator();
const FollowAndFriendsScreen = () => {
    return (
        <View style={styles.Container}>
            <HeaderBar title="Follow and Friends" />
            <Tab.Navigator
                initialRouteName="Vnpic"
                screenOptions={{
                    tabBarIndicatorStyle: {
                        backgroundColor: '#5E4EA0',
                        height: 3,
                        borderRadius: 2,
                    },
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: '700',
                    },
                }}>
                <Tab.Screen name="Followers" component={FollowerScreen} />
                <Tab.Screen name="Following" component={FollowingScreen} />
            </Tab.Navigator>
        </View>
    )
}

export default FollowAndFriendsScreen

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#fff',
    },
})