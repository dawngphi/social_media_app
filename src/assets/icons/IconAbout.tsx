import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const IconAbout = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#2C2B2B"
        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm0 18.125c-4.48 0-8.125-3.645-8.125-8.125S5.52 1.875 10 1.875 18.125 5.52 18.125 10 14.48 18.125 10 18.125Zm1.563-5h-.626V9.687A.938.938 0 0 0 10 8.75H8.75a.94.94 0 0 0-.938.938.94.94 0 0 0 .938.937h.313v2.5h-.626a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.937h3.124a.938.938 0 0 0 0-1.875ZM10 7.5A1.25 1.25 0 1 0 10 5a1.25 1.25 0 0 0 0 2.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconAbout
