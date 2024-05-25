import {ImageDetail} from '@/screens';
import {PostDetail} from '@/screens';
import {Post} from '@/type';
import CommentScreen from '@/screens/comment';
import EditPostScreen from '@/screens/edit_post';
import UserProfileDetail from '@/screens/searchScreen/UserProfileDetail';
import ProfileScreen from '@/screens/profileScreens/ProfileScreen';
import ProfileNavigator from '../ProfileNavigator';
import CommentNoti from '@/screens/comment/ComnentNoti';
export enum HomeStackNames {
  ImageDetail = 'ImageDetail',
  PostDetail = 'PostDetail',
  CommentScreen = 'CommentScreen',
  EditPostScreen = 'EditPostScreen',
  UserProfileDetail = 'UserProfileDetail',
  ProfileScreen = 'ProfileScreen',
  ProfileNavigator = 'ProfileNavigator',
  CommentNoti = 'CommentNoti',
}
export type HomeStackParamList = {
  [HomeStackNames.UserProfileDetail]: {userId: string, userName: string};
  [HomeStackNames.ImageDetail]: undefined;
  [HomeStackNames.PostDetail]: {post: Post};
  [HomeStackNames.CommentScreen]: {post: Post};
  [HomeStackNames.EditPostScreen]: {post: Post};
  [HomeStackNames.ProfileScreen]: undefined;
  [HomeStackNames.ProfileNavigator]: undefined;
  [HomeStackNames.CommentNoti]: {post: Post};
};
interface StackProps {
  name: HomeStackNames;
  component: () => React.JSX.Element;
  options?: any;
}
export const HomeStacks: StackProps[] = [
  {
    name: HomeStackNames.ImageDetail,
    component: ImageDetail,
    options: {},
  },
  {
    name: HomeStackNames.PostDetail,
    component: PostDetail,
    options: {},
  },
  {
    name: HomeStackNames.CommentScreen,
    component: CommentScreen,
    options: {},
  },
  {
    name: HomeStackNames.EditPostScreen,
    component: EditPostScreen,
    options: {},
  },
  {
    name: HomeStackNames.UserProfileDetail,
    component: UserProfileDetail,
    options: {},
  },
  {
    name: HomeStackNames.ProfileScreen,
    component: ProfileScreen,
    options: {},
  },
  {
    name: HomeStackNames.ProfileNavigator,
    component: ProfileNavigator,
    options: {},
  },
  {
    name: HomeStackNames.CommentNoti,
    component: CommentNoti,
    options: {},
  },
];
