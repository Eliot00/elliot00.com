import React from 'react'

const CustomLink: React.FC = props => {
  return (
    <a className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out" {...props}>{props.children}</a>
  )
}

export default CustomLink

