import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconPrivacy = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#2C2B2B"
      d="M4.75 7.5V5a5 5 0 1 1 10 0v2.5H16c1.379 0 2.5 1.121 2.5 2.5v7.5c0 1.379-1.121 2.5-2.5 2.5H3.5C2.12 20 1 18.879 1 17.5V10c0-1.379 1.12-2.5 2.5-2.5h1.25Zm1.875 0h6.25V5a3.125 3.125 0 1 0-6.25 0v2.5Zm-3.75 10c0 .344.28.625.625.625H16a.627.627 0 0 0 .625-.625V10A.627.627 0 0 0 16 9.375H3.5a.626.626 0 0 0-.625.625v7.5Z"
    />
  </Svg>
)
export default IconPrivacy
