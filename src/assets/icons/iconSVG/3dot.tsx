import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Svg3dot = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#9F9F9F"
      d="M10.75 12a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0ZM4.75 12a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0ZM16.75 12a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Z"
    />
  </Svg>
)
export default Svg3dot
