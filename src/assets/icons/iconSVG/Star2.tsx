import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgStar2 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#5E4EA0"
      d="M10.98 1.633A1.086 1.086 0 0 0 9.997 1c-.42 0-.798.246-.982.633L6.824 6.284l-4.895.745c-.409.064-.75.359-.876.763s-.024.851.27 1.15l3.551 3.624-.838 5.123c-.068.421.102.85.44 1.1.337.25.783.281 1.152.08L10 16.463l4.373 2.408c.368.2.815.172 1.152-.08.338-.254.508-.68.44-1.101l-.842-5.123 3.552-3.624c.293-.299.399-.746.27-1.15-.13-.404-.468-.7-.877-.763l-4.898-.745-2.192-4.651Z"
    />
  </Svg>
)
export default SvgStar2
