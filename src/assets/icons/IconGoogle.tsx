import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const IconGoogle = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Rect width={39} height={39} x={0.5} y={0.5} fill="#fff" rx={19.5} />
    <Rect width={39} height={39} x={0.5} y={0.5} stroke="#E3E3E3" rx={19.5} />
    <Path
      fill="#4280EF"
      d="M32.5 20.306c0-.862-.083-1.75-.222-2.584H20.25v4.917h6.889a5.796 5.796 0 0 1-2.556 3.861l4.111 3.195c2.417-2.25 3.806-5.528 3.806-9.39Z"
    />
    <Path
      fill="#34A353"
      d="M20.25 32.75c3.444 0 6.333-1.139 8.444-3.083l-4.11-3.167c-1.14.778-2.612 1.222-4.334 1.222-3.334 0-6.14-2.25-7.167-5.25l-4.222 3.25A12.737 12.737 0 0 0 20.25 32.75Z"
    />
    <Path
      fill="#F6B704"
      d="M13.083 22.445a7.745 7.745 0 0 1 0-4.89l-4.222-3.277a12.767 12.767 0 0 0 0 11.444l4.222-3.277Z"
    />
    <Path
      fill="#E54335"
      d="M20.25 12.306a6.956 6.956 0 0 1 4.889 1.916l3.639-3.666c-2.306-2.167-5.361-3.334-8.528-3.306a12.738 12.738 0 0 0-11.39 7.028l4.223 3.277c1.028-3.027 3.833-5.25 7.167-5.25Z"
    />
  </Svg>
)
export default IconGoogle
