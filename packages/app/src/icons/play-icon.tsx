import type { IconProps } from '../types'

export const PlayIcon = ({
  size,
  color = 'currentColor',
  strokeWidth = 2,
  ...rest
}: IconProps) => (
  <svg
    {...rest}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M16 12L10 8V16L16 12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
