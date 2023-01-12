import type { IconProps } from '../types'

export const ShareIcon = ({
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
    <circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M15.408 6.51199L8.59436 10.4866M15.408 17.488L8.59436 13.5134"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
