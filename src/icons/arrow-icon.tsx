import { IconProps } from '../types'

export const ArrowIcon = ({ size, color, ...rest }: IconProps) => {
  return (
    <svg
      {...rest}
      focusable={false}
      width={size}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 5L3 10L8 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H11C16.5228 10 21 14.4772 21 20V21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
