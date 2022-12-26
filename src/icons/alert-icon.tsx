import { IconProps } from '../types'

export const AlertIcon = ({ size, color, ...rest }: IconProps) => {
  return (
    <svg
      {...rest}
      focusable={false}
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 9V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17.5V18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M2.23231 19.0159L10.3489 3.05158C11.0617 1.64947 12.9383 1.64947 13.6512 3.05158L21.7677 19.0159C22.4513 20.3606 21.5442 22 20.1165 22H3.88346C2.45582 22 1.54868 20.3606 2.23231 19.0159Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
