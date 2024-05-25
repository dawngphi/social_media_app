import AccountScreen from "@/screens/profileScreens/AccountScreen";
import PrivacyScreen from "@/screens/profileScreens/PrivacyScreen";
import ProfileScreen from "@/screens/profileScreens/ProfileScreen";
import Setting from "@/screens/profileScreens/Setting";
import FollowAndFriendsScreen from "@/screens/profileScreens/FollowAndFriendsScreen";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NotificationScreen from "@/screens/profileScreens/NotificationScreen";
import HelpScreen from "@/screens/profileScreens/HelpScreen";
import AboutSreen from "@/screens/profileScreens/AboutSreen";
import EditProfileScreen from "@/screens/profileScreens/EditProfileScreen";
import UserProfileDetail from "@/screens/searchScreen/UserProfileDetail";

export enum ProfileStackNames {
    Profile = "ProfileScreen",
    Setting = "Setting",
    Account = "AccountScreen",
    Privacy = "PrivacyScreen",
    FollowAndFriends = "FollowAndFriendsScreen",
    Notification = "NotificationScreen",
    Help = "HelpScreen",
    About = "AboutSreen",
    EditProfile = "EditProfileScreen",
    UserProfileDetail = "UserProfileDetail"
}

export type ProfileStackParamList = {
    [ProfileStackNames.Profile]: undefined;
    [ProfileStackNames.Setting]: undefined;
    [ProfileStackNames.Account]: undefined;
    [ProfileStackNames.Privacy]: undefined;
    [ProfileStackNames.FollowAndFriends]: undefined;
    [ProfileStackNames.Notification]: undefined;
    [ProfileStackNames.Help]: undefined;
    [ProfileStackNames.About]: undefined;
    [ProfileStackNames.EditProfile]: undefined;
    [ProfileStackNames.UserProfileDetail]: { userId: string, userName: string };
};

interface StackProps {
    name: ProfileStackNames;
    component: () => React.JSX.Element;
    options?: any;
}

export const ProfileStacks: StackProps[] = [
    {
        name: ProfileStackNames.Profile,
        component: ProfileScreen,
        options: {}
    },
    {
        name: ProfileStackNames.Setting,
        component: Setting,
        options: {}
    },
    {
        name: ProfileStackNames.Account,
        component: AccountScreen,
        options: {}
    },
    {
        name: ProfileStackNames.Privacy,
        component: PrivacyScreen,
        options: {}
    },
    {
        name: ProfileStackNames.FollowAndFriends,
        component: FollowAndFriendsScreen,
        options: {}
    },
    {
        name: ProfileStackNames.Notification,
        component: NotificationScreen,
        options: {}
    },
    {
        name: ProfileStackNames.Help,
        component: HelpScreen,
        options: {}
    },
    {
        name: ProfileStackNames.About,
        component: AboutSreen,
        options: {}
    },
    {
        name: ProfileStackNames.EditProfile,
        component: EditProfileScreen,
        options: {}
    },
    {
        name: ProfileStackNames.UserProfileDetail,
        component: UserProfileDetail,
        options: {}
    }
];

export type ProfileNavigatorProps =  NativeStackNavigationProp<ProfileStackParamList>;