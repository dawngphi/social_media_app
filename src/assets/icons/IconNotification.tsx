import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconNotification = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#2C2B2B"
      d="M9.75 0C9.057 0 8.5.559 8.5 1.25v.7a5.94 5.94 0 0 0-5 5.862v1.305a7.82 7.82 0 0 1-1.712 4.88l-.582.73a.935.935 0 0 0 .73 1.523h15.626a.938.938 0 0 0 .73-1.523L17.71 14A7.838 7.838 0 0 1 16 9.117V7.812a5.94 5.94 0 0 0-5-5.863V1.25C11 .559 10.44 0 9.75 0Zm0 3.75h.312a4.064 4.064 0 0 1 4.062 4.063v1.304c0 1.871.543 3.695 1.55 5.258H3.825a9.701 9.701 0 0 0 1.55-5.258V7.812A4.064 4.064 0 0 1 9.437 3.75h.312Zm2.5 13.75h-5c0 .664.26 1.3.73 1.77a2.5 2.5 0 0 0 1.77.73 2.5 2.5 0 0 0 1.769-.73 2.5 2.5 0 0 0 .73-1.77Z"
    />
  </Svg>
)
export default IconNotification
