const Divider: React.FC = (props) => {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400" />
      <span className="flex-shrink mx-4 text-gray-400">{props.children}</span>
      <div className="flex-grow border-t border-gray-400" />
    </div>
  )
}

export default Divider
