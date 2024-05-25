import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SearchIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color ?? '#C8C8C8'}
      d="M19.5 9.748c0 2.152-.698 4.14-1.875 5.752l5.935 5.939a1.502 1.502 0 0 1-2.124 2.123l-5.934-5.939a9.694 9.694 0 0 1-5.752 1.875A9.748 9.748 0 0 1 0 9.748a9.749 9.749 0 0 1 9.75-9.75 9.749 9.749 0 0 1 9.75 9.75Zm-9.75 6.75a6.748 6.748 0 0 0 6.237-9.333 6.75 6.75 0 1 0-6.237 9.333Z"
    />
  </Svg>
);
export default SearchIcon;
