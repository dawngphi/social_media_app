import React from 'react';
import HomeIcon from '@/assets/icons/HomeIcon';
import {HomeScreen, LoginScreen, PostScreen} from '@/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import SearchIcon from '@/assets/icons/SearchIcon';
import PostIcon from '@/assets/icons/PostIcon';
import StarIcon from '@/assets/icons/StarIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import ProfileScreen from '@/screens/profileScreens/ProfileScreen';
import ProfileNavigator from '../ProfileNavigator';
import Notification from '@/screens/Notification/NotificationScreen';
import SearchScreen from '@/screens/searchScreen/SearchScreen';
import SearchNavigator from '../SearchNavigator';
const Tab = createBottomTabNavigator();
type BottomTabProps = {
  icon: (props: SvgProps) => React.JSX.Element;
  name: string;
  component: () => React.JSX.Element;
};
const BottomTabs: BottomTabProps[] = [
  {
    icon: HomeIcon,
    name: 'Home',
    component: HomeScreen,
  },
  {
    icon: SearchIcon,
    name: 'Search',
    component: SearchNavigator,
  },
  {
    icon: PostIcon,
    name: 'Post',
    component: PostScreen,
  },
  {
    icon: StarIcon,
    name: 'Notification',
    component: Notification,
  },
  {
    icon: ProfileIcon,
    name: 'Profile',
    component: ProfileNavigator,
  },
];

function AppBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#5E4EA0',
        tabBarInactiveTintColor: '#C8C8C8',
        tabBarHideOnKeyboard: true,
      }}>
      {BottomTabs.map((tab, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({color}) => <tab.icon color={color} />,
              tabBarHideOnKeyboard: true,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
export default AppBottomTab;
