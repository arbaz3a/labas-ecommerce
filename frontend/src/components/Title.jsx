import React from 'react'

function Title({text1, text2}) {
  return (
    <div className='inline-flex gap-2 items-center mb-2'>
        <p className='text-gray-600 '>{text1} <span className='text-gray-900 font-medium'>{text2}</span></p>
    </div>
  )
}

export default Title