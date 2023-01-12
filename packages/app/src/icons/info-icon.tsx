import type { IconProps } from '../types'

export const InfoIcon = ({ size, color = 'currentColor', ...rest }: IconProps) => (
  <svg
    {...rest}
    width={size}
    focusable={false}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M12 7H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M10 11H12V16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 16H14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
