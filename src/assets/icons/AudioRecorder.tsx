import { svgProps } from '.'

export const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path
      fill="currentColor"
      d="M10 .833A4.167 4.167 0 0 1 14.165 5v3.333a4.167 4.167 0 0 1-8.334 0V5A4.167 4.167 0 0 1 10 .833ZM2.544 9.167h1.68a5.835 5.835 0 0 0 11.547 0h1.68a7.504 7.504 0 0 1-6.62 6.62v3.38H9.166v-3.38a7.503 7.503 0 0 1-6.621-6.62Z"
    />
  </svg>
)

export const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    <path
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874a.563.563 0 0 1-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564z"
    />
  </svg>
)

export const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
    />
  </svg>
)

export const BackwardIcon = (props: svgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#1D1D1F"
      d="M10.5 9.748a.75.75 0 0 1-1.184.613l-5.25-3.723a.75.75 0 0 1-.005-1.22l5.25-3.779a.75.75 0 0 1 1.189.609v7.5Zm-9 .377a.375.375 0 0 0 .75 0v-8.25a.375.375 0 0 0-.75 0v8.25Z"
    />
  </svg>
)

export const FordwardIcon = (props: svgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#1D1D1F"
      d="M1.5 2.252a.75.75 0 0 1 1.183-.612l5.25 3.722a.75.75 0 0 1 .006 1.22l-5.25 3.779A.75.75 0 0 1 1.5 9.752v-7.5Zm9-.377a.375.375 0 1 0-.75 0v8.25a.375.375 0 0 0 .75 0v-8.25Z"
    />
  </svg>
)

export const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={20} height={20}>
    <path
      fill="#187EE7"
      d="M10.001 1.667a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666ZM8.335 13.75v-7.5l5 3.75-5 3.75Z"
    />
  </svg>
)

export const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
    <path
      fill="#E71818"
      d="M8.5 4h3a1.5 1.5 0 1 0-3 0Zm-1 0a2.5 2.5 0 1 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 1 1 0-1h5ZM9 8a.5.5 0 1 0-1 0v6a.5.5 0 0 0 1 0V8Zm2.5-.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0V8a.5.5 0 0 0-.5-.5Z"
    />
  </svg>
)

export const BigBackwordIcon = (props: svgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#1D1D1F"
      d="M21 19.497a1.5 1.5 0 0 1-2.367 1.224l-10.5-7.444a1.5 1.5 0 0 1-.01-2.442l10.5-7.556A1.5 1.5 0 0 1 21 4.495v15.002ZM3 20.25a.75.75 0 1 0 1.5 0V3.75a.75.75 0 0 0-1.5 0v16.5Z"
    />
  </svg>
)

export const BigForwardIcon = (props: svgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M3 4.503a1.5 1.5 0 0 1 2.367-1.224l10.5 7.444a1.5 1.5 0 0 1 .01 2.442l-10.5 7.556A1.5 1.5 0 0 1 3 19.505V4.502Zm18-.753a.75.75 0 1 0-1.5 0v16.5a.75.75 0 1 0 1.5 0V3.75Z"
    />
  </svg>
)
