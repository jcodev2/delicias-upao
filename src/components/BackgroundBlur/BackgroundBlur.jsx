const BackgroundBlur = () => {
  return (
    <div
      className='absolute left-[50%] top-[50%] -z-10 flex h-3/5 w-screen translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-cover bg-center'
      style={{
        background:
          'linear-gradient(106.89deg, rgba(255, 99, 71, 0.2) 15.73%, rgba(255, 165, 0, 0.30) 15.74%, rgba(255, 229, 219, 0.6) 56.49%, rgba(237, 43, 42, 0.4) 115.91%)',
        filter: 'blur(200px)'
      }}
    />
  )
}

export default BackgroundBlur
