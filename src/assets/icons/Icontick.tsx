import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Icontick = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#3897F0"
      d="m5.527 16.5-1.382-2.438-2.618-.61.255-2.819L0 8.5l1.782-2.133-.255-2.82 2.618-.609L5.527.5 8 1.605 10.473.5l1.381 2.438 2.619.61-.255 2.819L16 8.5l-1.782 2.133.255 2.82-2.619.609-1.381 2.438L8 15.395 5.527 16.5Zm1.71-5.295L11.344 6.9l-1.018-1.105-3.09 3.238-1.564-1.6L4.655 8.5l2.581 2.705Z"
    />
  </Svg>
)
export default Icontick
