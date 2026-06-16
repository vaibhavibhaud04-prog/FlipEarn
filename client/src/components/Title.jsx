import React from 'react'

const Title = ({title,discription}) => {
  return (
    <div className='flex flex-col items-center mb-8'>
        <div className='text-2xl font-bold text-gray-800'>{title}</div>
        <p className='text-slate-600 max-w-[500px]'> {discription} </p>
      
    </div>
  )
}

export default Title
