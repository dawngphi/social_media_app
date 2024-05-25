import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const IconShare= (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Rect width={20} height={20} fill="#475BFF" rx={10} />
    <Path
      fill="#fff"
      d="M11.195 5.066a.751.751 0 0 0-.445.684v1.5H8.125A4.125 4.125 0 0 0 4 11.376a4.596 4.596 0 0 0 2.348 4.08.383.383 0 0 0 .19.045.463.463 0 0 0 .462-.462c0-.176-.1-.338-.23-.457-.22-.209-.52-.619-.52-1.332A2.25 2.25 0 0 1 8.5 11h2.25v1.5a.753.753 0 0 0 1.252.558l3.75-3.375A.755.755 0 0 0 16 9.125a.746.746 0 0 0-.248-.557l-3.75-3.375a.744.744 0 0 0-.807-.127Z"
    />
  </Svg>
)
export default IconShare
