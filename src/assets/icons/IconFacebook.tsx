import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs, ClipPath } from "react-native-svg"
const IconFacebook = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect width={40} height={40} fill="#1877F2" rx={20} />
      <Path
        fill="#fff"
        d="M27.785 25.781 28.672 20h-5.547v-3.752c0-1.581.775-3.123 3.26-3.123h2.521V8.203s-2.288-.39-4.477-.39c-4.568 0-7.554 2.768-7.554 7.78V20h-5.078v5.781h5.078v13.976a20.145 20.145 0 0 0 6.25 0V25.781h4.66Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={40} height={40} fill="#fff" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconFacebook
