import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgAdd = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#2C2B2B"
        d="M8.4 10a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6Zm0-7.8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Zm1.901 9.6H6.5A6.5 6.5 0 0 0 0 18.299a1.3 1.3 0 0 0 1.3 1.3H15.5c.718 0 1.299-.58 1.299-1.3a6.5 6.5 0 0 0-6.499-6.5Zm-8.474 6a4.704 4.704 0 0 1 4.672-4.2H10.3c2.423 0 4.392 1.842 4.673 4.2H1.827ZM23.1 7.9h-1.8V6.1a.9.9 0 0 0-1.8 0v1.8h-1.8c-.495 0-.9.405-.9.9s.403.9.9.9h1.8v1.8a.9.9 0 0 0 1.8 0V9.7h1.8c.499 0 .9-.401.9-.9s-.401-.9-.9-.9Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgAdd
