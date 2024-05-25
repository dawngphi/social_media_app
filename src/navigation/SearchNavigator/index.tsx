import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchStackParamList, SearchStacks} from './config';
import { SearchStackNames } from './config';

export default function SearchNavigator() {
  const AppStack = createNativeStackNavigator<SearchStackParamList>();
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      {SearchStacks.map((stack, index) => {
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
