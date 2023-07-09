const BackgroundBlur = ({ opacity = '100' }) => {
  return (
    <div
      className='absolute left-[50%] top-[50%] -z-10 flex h-4/5 max-h-full w-screen max-w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-cover bg-center'
      style={{
        background:
          'linear-gradient(106.89deg, rgba(255, 99, 71, 0.2) 15.73%, rgba(255, 165, 0, 0.30) 15.74%, rgba(255, 229, 219, 0.6) 56.49%, rgba(237, 43, 42, 0.4) 115.91%)',
        filter: 'blur(200px)',
        opacity: `${opacity}%`
      }}
    />
  )
}

export default BackgroundBlur
