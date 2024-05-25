import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconClose = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke="#767676"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.688 18.688 7.313 7.313m11.375 0L7.313 18.688"
    />
  </Svg>
)
export default IconClose
