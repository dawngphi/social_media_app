import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const PrivateIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={17}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d="M9.679 4.64v1.548h5.198V4.64a2.588 2.588 0 0 0-2.6-2.579A2.588 2.588 0 0 0 9.68 4.642Zm-2.08 1.548V4.64C7.6 2.079 9.695 0 12.278 0s4.679 2.079 4.679 4.64v1.548h.52c1.146 0 2.079.924 2.079 2.062v6.188a2.073 2.073 0 0 1-2.08 2.062H7.08A2.073 2.073 0 0 1 5 14.437V8.25c0-1.138.932-2.063 2.08-2.063h.52Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={12.278}
        x2={12.278}
        y1={0}
        y2={16.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5E4EA0" />
        <Stop offset={1} stopColor="#DC92B9" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v16.5H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PrivateIcon
