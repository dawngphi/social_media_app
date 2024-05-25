// this is sample config file for navigation
import App from '@/App';
import {LoginScreen} from '@/screens';
import React, {ReactElement} from 'react';
import AppBottomTab from './bottom_tab';
import LoginNavigation from './login';
import {NavigatorScreenParams} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import {HomeStackParamList} from './HomeNavigator/config';
import {HomeStacks} from './HomeNavigator/config';

export enum AppStackNames {
  LoginNavigation = 'LoginNavigation',
  HomeBottomTab = 'HomeBottomTab',
  HomeNavigator = 'HomeNavigator',
}

export type RootStackParamList = {
  [AppStackNames.LoginNavigation]: undefined;
  [AppStackNames.HomeBottomTab]: undefined;
  [AppStackNames.HomeNavigator]:
    | NavigatorScreenParams<HomeStackParamList>
    | undefined;
};

interface StackProps {
  name: AppStackNames;
  component: () => React.JSX.Element;
  options?: any;
}

export const AppStacks: StackProps[] = [
  {
    name: AppStackNames.LoginNavigation,
    component: LoginNavigation,
    options: {},
  },
  {
    name: AppStackNames.HomeBottomTab,
    component: AppBottomTab,
    options: {},
  },
  {
    name: AppStackNames.HomeNavigator,
    component: HomeNavigator,
    options: {},
  },
];
