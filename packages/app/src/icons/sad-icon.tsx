import type { IconProps } from '../types'

export const SadIcon = ({ size, color, ...rest }: IconProps) => {
  const strokeWidth = rest.strokeWidth ?? '2'

  return (
    <svg
      {...rest}
      width={size}
      focusable={false}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8 9.05001V8.95001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M16 9.05001V8.95001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M16 16C15.5 14.5 14.2091 13 12 13C9.79086 13 8.5 14.5 8 16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
