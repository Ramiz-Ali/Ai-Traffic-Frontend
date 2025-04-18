import * as React from "react"
const Lock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={75}
    height={56}
    fill="none"
    {...props}
  >
    <path
      stroke="#007AFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6}
      d="M53.125 25.667v-9.334c0-3.094-1.646-6.061-4.577-8.25-2.93-2.187-6.904-3.416-11.048-3.416s-8.118 1.229-11.049 3.417c-2.93 2.188-4.576 5.155-4.576 8.25v9.333m37.5 0h-43.75c-3.452 0-6.25 2.09-6.25 4.666v16.334c0 2.577 2.798 4.666 6.25 4.666h43.75c3.452 0 6.25-2.089 6.25-4.666V30.333c0-2.577-2.798-4.666-6.25-4.666Z"
    />
  </svg>
)
export default Lock;
