import * as React from "react"
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const IconComment2 = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Rect width={20} height={20} fill="#FFDC22" rx={10} />
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M11.676 5.997 13 5.5l.497-1.324a.27.27 0 0 1 .506 0L14.5 5.5l1.324.497a.271.271 0 0 1 0 .506L14.5 7l-.497 1.324a.271.271 0 0 1-.506 0L13 7l-1.324-.497c-.127-.04-.176-.14-.176-.253 0-.113.05-.214.176-.253ZM10.042 8.39l2.672 1.235a.374.374 0 0 1 0 .682l-2.672 1.235-1.235 2.672a.374.374 0 0 1-.682 0L6.89 11.542l-2.672-1.235a.375.375 0 0 1 0-.682L6.89 8.39l1.235-2.672a.376.376 0 0 1 .682 0l1.235 2.672Zm3.455 3.286c.04-.127.14-.176.253-.176.113 0 .213.05.253.176L14.5 13l1.324.497a.271.271 0 0 1 0 .506L14.5 14.5l-.497 1.324a.271.271 0 0 1-.506 0L13 14.5l-1.324-.497c-.127-.04-.176-.14-.176-.253 0-.113.05-.213.176-.253L13 13l.497-1.324Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M4 4h12v12H4z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconComment2
