import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgBlock = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="red"
      d="M23 12c0 6.076-4.924 11-11 11S1 18.076 1 12 5.924 1 12 1s11 4.924 11 11ZM4.993 6.453A8.888 8.888 0 0 0 3.063 12c0 4.937 4 8.938 8.937 8.938a8.895 8.895 0 0 0 5.547-1.93L4.993 6.453ZM20.937 12c0-4.937-4-8.938-8.937-8.938a8.888 8.888 0 0 0-5.547 1.931l12.555 12.554A8.895 8.895 0 0 0 20.938 12Z"
    />
  </Svg>
)
export default SvgBlock
