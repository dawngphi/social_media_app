import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgMute = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="#2C2B2B"
      d="M12.55 1.786a1.333 1.333 0 0 0-1.435.219L5.492 7H2C.895 7 0 7.896 0 8.963v3.962c0 1.105.895 1.963 2 1.963h3.493l5.621 4.996a1.334 1.334 0 0 0 2.219-.997V3c-.037-.524-.304-1-.783-1.214Zm-1.217 15.73L6.254 13H2V9.038h4.254l5.08-4.553v13.032Zm10.08-6.553 1.96-1.96a1 1 0 1 0-1.415-1.414L20 9.588l-1.996-1.963A1 1 0 1 0 16.59 9.04L18.55 11l-1.96 1.96a1 1 0 1 0 1.414 1.414L20 12.413l1.96 1.96a1 1 0 1 0 1.414-1.415l-1.961-1.995Z"
    />
  </Svg>
)
export default SvgMute
