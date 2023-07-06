const Overlay = ({ onChange }) => {
  return (
    <div
      className='absolute h-full w-full bg-neutral-900/50 backdrop-blur-sm'
      onClick={() => onChange(false)}
    />
  )
}

export default Overlay
