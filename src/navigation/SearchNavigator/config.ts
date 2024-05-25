
import SearchScreen from '@/screens/searchScreen/SearchScreen';
import ResultSearch from '@/screens/searchScreen/ResultSearch';
import UserProfileDetail from '@/screens/searchScreen/UserProfileDetail';
export enum SearchStackNames {
    SearchScreen = 'SearchScreen',
    ResultSearch = 'ResultSearch',
    UserProfileDetail = 'UserProfileDetail',
}
export type SearchStackParamList = {
  [SearchStackNames.SearchScreen]: undefined;
  [SearchStackNames.ResultSearch]: {searchText: string};
  [SearchStackNames.UserProfileDetail]: {userId: string, userName: string};
};
interface StackProps {
  name: SearchStackNames;
  component: () => React.JSX.Element;
  options?: any;
}
export const SearchStacks: StackProps[] = [
  {
    name: SearchStackNames.SearchScreen,
    component: SearchScreen,
    options: {},
  },
  {
    name: SearchStackNames.ResultSearch,
    component: ResultSearch,
    options: {},
  },
  {
    name: SearchStackNames.UserProfileDetail,
    component: UserProfileDetail,
    options: {},
  },
];
