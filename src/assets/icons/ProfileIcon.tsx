import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ProfileIcon = (props: SvgProps) => (
  <Svg width={22} height={24} fill="none" {...props}>
    <Path
      fill={props.color ?? '#C8C8C8'}
      d="M11 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-2.142 2.25A8.356 8.356 0 0 0 .5 22.608C.5 23.377 1.123 24 1.892 24h18.216c.769 0 1.392-.623 1.392-1.392a8.356 8.356 0 0 0-8.358-8.358H8.858Z"
    />
  </Svg>
);
export default ProfileIcon;
