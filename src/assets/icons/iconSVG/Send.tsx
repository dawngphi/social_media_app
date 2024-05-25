import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgSend = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#C8C8C8"
      d="M2.493 10.131c-.706.403-.64 1.478.113 1.79L6.99 13.75v3.228a1.02 1.02 0 0 0 1.806.653l1.938-2.322 3.871 1.613c.591.247 1.275-.14 1.372-.772l2-13a.997.997 0 0 0-.422-.975 1.003 1.003 0 0 0-1.062-.044l-14 8Zm1.628.797 10.672-6.097L7.931 12.5l.037.031-3.847-1.603Zm10.472 4.366-5.206-2.172 6.69-7.478-1.484 9.65Z"
    />
  </Svg>
)
export default SvgSend
