import React from 'react'

const Header = ({ title, subtitle, rightElement }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold py-1">{title}</h1>
        {subtitle && <p className="text-gray-500 mb-4">{subtitle}</p>}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  )
}

export default Header
