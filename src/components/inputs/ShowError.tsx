import React from 'react'
import { WarningIcon } from '~/assets/icons'

interface ShownErrorProps {
  error: string
}

const ShownError: React.FC<ShownErrorProps> = ({ error }) => {
  if (!error || !error.trim()) {
    // Return null if error is empty or only contains whitespace
    return null
  }

  return (
    <div className="text-[#E30000] leading-[16px] text-[12px] font-[Inter] font-normal gap-[2px] ml-1 flex items-center">
      <WarningIcon />
      {error}
    </div>
  )
}

export default ShownError
