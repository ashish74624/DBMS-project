import React from 'react'

export default function Design() {
  return (
    <>
      <div className='bg-[#4d2d18] absolute  w-80 h-80 rounded-full bottom-[75vh] right-[85vw]  hover:w-96 hover:h-96 transition-all'></div>
            <div className='bg-[#4d2d18] absolute  w-80 h-80 rounded-full top-[75vh] left-[85vw]  hover:w-96 hover:h-96 transition-all'></div>
            <div className="w-[2px] h-[500px] bg-[#4d2d18] absolute top-0 right-0 rotate-45 origin-top"></div>
            <div className=" w-[2px] h-[500px] bg-[#4d2d18] absolute top-[50vh] rotate-45 left-[300px] origin-top"></div>
            <div className='absolute w-20 h-20 rounded-full blur-md animate-bounce bottom-1 right-4'></div>
    </>
  )
}
