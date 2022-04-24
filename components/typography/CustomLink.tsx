import React from 'react'

const CustomLink: React.FC = (props) => {
  return (
    <a
      className="text-indigo-500 hover:text-indigo-900 underline transition duration-150 ease-in-out"
      {...props}
    >
      {props.children}
    </a>
  )
}

export default CustomLink
