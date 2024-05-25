import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconMenu = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#484848"
      d="M0 4.125C0 3.504.504 3 1.125 3h18.75C20.498 3 21 3.504 21 4.125c0 .623-.502 1.125-1.125 1.125H1.125A1.124 1.124 0 0 1 0 4.125Zm0 7.5c0-.623.504-1.125 1.125-1.125h18.75c.623 0 1.125.502 1.125 1.125s-.502 1.125-1.125 1.125H1.125A1.124 1.124 0 0 1 0 11.625Zm19.875 8.625H1.125a1.124 1.124 0 1 1 0-2.25h18.75c.623 0 1.125.502 1.125 1.125s-.502 1.125-1.125 1.125Z"
    />
  </Svg>
)
export default IconMenu
