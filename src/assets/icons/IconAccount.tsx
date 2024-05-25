import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconAccount = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#2C2B2B"
      d="M11.625 11.875h-3.75A6.875 6.875 0 0 0 1 18.75c0 .69.56 1.25 1.25 1.25h15c.69 0 1.25-.56 1.25-1.25a6.875 6.875 0 0 0-6.875-6.875Zm-8.711 6.25a5.005 5.005 0 0 1 4.961-4.375h3.75a5.008 5.008 0 0 1 4.96 4.375H2.915ZM9.75 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-8.125A3.129 3.129 0 0 1 12.875 5 3.129 3.129 0 0 1 9.75 8.125 3.129 3.129 0 0 1 6.625 5 3.129 3.129 0 0 1 9.75 1.875Z"
    />
  </Svg>
)
export default IconAccount
