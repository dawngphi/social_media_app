import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const IconStar2= (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Rect width={20} height={20} fill="#5E4EA0" rx={10} />
    <Path
      fill="#fff"
      d="M10.653 4.422A.724.724 0 0 0 9.998 4a.727.727 0 0 0-.654.422l-1.461 3.1-3.264.497a.732.732 0 0 0-.584.509.77.77 0 0 0 .18.766l2.368 2.416-.56 3.414a.763.763 0 0 0 .294.734.714.714 0 0 0 .768.054l2.916-1.605 2.915 1.605a.709.709 0 0 0 .768-.054.765.765 0 0 0 .293-.734l-.56-3.414 2.367-2.416a.765.765 0 0 0 .18-.766.735.735 0 0 0-.584-.509l-3.266-.497-1.461-3.1Z"
    />
  </Svg>
);
export default IconStar2;
