import type { IconProps } from '../types'

export const CrossIcon = ({
  size,
  color = 'currentColor',
  strokeWidth = 2,
  ...rest
}: IconProps) => (
  <svg
    {...rest}
    focusable={false}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 20L4 4.00003M20 4L4.00002 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
)
