import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackParamList, ProfileStacks } from './config'

const ProfileNavigator = () => {
    const AppStack = createNativeStackNavigator<ProfileStackParamList>();
    return (
        <AppStack.Navigator
            screenOptions={{ headerShown: false }}>
            {ProfileStacks.map((stack, index) => {
                return <AppStack.Screen
                    key={index}
                    name={stack.name}
                    component={stack.component}
                    options={stack.options}
                />;
            })
            }
        </AppStack.Navigator>
    )
}

export default ProfileNavigator
