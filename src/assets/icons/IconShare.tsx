import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconShare = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#525151"
      d="M14 4a3 3 0 0 1-3 3C9.316 7 8 5.656 8 4c0-1.657 1.316-3 3-3a3 3 0 0 1 3 3ZM6 8a3 3 0 0 1-6 0c0-1.684 1.343-3 3-3 1.656 0 3 1.316 3 3Zm2 4c0-1.684 1.316-3 3-3 1.656 0 3 1.316 3 3a3 3 0 0 1-3 3c-1.684 0-3-1.344-3-3Z"
    />
    <Path
      fill="#000"
      d="M5.978 7.628a2.994 2.994 0 0 0-.897-1.787l2.94-1.47c.088.698.413 1.323.898 1.788L5.978 7.63Zm2.94 2.213a2.994 2.994 0 0 0-.896 1.787L5.08 10.16c.484-.465.81-1.09.897-1.787l2.94 1.469Z"
      opacity={0.4}
    />
  </Svg>
)
export default IconShare
