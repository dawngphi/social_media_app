import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList, HomeStacks} from './config';

export default function HomeNavigator() {
  const AppStack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      {HomeStacks.map((stack, index) => {
        return (
          <AppStack.Screen
            key={index}
            name={stack.name}
            component={stack.component}
            options={stack.options}
          />
        );
      })}
    </AppStack.Navigator>
  );
}
