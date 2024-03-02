import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HoverCard({link,src}:any) {
  return (
      
      <div className=' flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative group overflow-hidden'>
            <Link className='w-full h-full' href={link}>
            <Image className="rounded-t-sm w-full h-full group-hover:scale-125  transition-all duration-500" src={src} alt="" width={400} height={260} />
                <div className='absolute top-11 w-full h-full bg-slate-700 opacity-0 bg-opacity-0 group-hover:top-0 group-hover:bg-opacity-50 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 text-white flex justify-center items-center'>
                    Click Here !
                </div>
    </Link>
        </div>   
  )
}
