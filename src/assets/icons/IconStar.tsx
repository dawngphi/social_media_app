import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconStar = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#5E4EA0"
      d="M6.68 12.672c-.24-1.376-1.217-3.104-3.073-4.496-.912-.688-1.84-1.136-2.752-1.328v-.672c1.808-.432 3.584-1.648 4.72-3.296.576-.832.944-1.648 1.104-2.496h.672C7.623 2 8.871 3.792 10.567 4.992c.832.592 1.696.992 2.576 1.184v.672c-1.776.368-3.84 1.952-4.864 3.568-.512.816-.816 1.568-.928 2.256H6.68Z"
    />
  </Svg>
)
export default IconStar
