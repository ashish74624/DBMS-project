import { Lora } from 'next/font/google'
import { Barlow } from 'next/font/google'
import Link from 'next/link'


const Com = Lora({
    subsets:['cyrillic'],
    weight:'400'
})

const bar = Barlow({
  subsets:['latin'],
  weight:'500'
})

export default function Home() {
  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
      <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <div className='bg-[#4d2d18] absolute  w-80 h-80 rounded-full bottom-[75vh] right-[85vw]  hover:w-96 hover:h-96 transition-all'></div>
            <div className='bg-[#4d2d18] absolute  w-80 h-80 rounded-full top-[75vh] left-[85vw]  hover:w-96 hover:h-96 transition-all'></div>
            <div className={` w-[2px] h-[500px] bg-[#4d2d18] absolute top-0 right-0 rotate-45 origin-top `}></div>
            <div className=" w-[2px] h-[500px] bg-[#4d2d18] absolute top-[50vh] rotate-45 left-[300px] origin-top"></div>
            <div className=' absolute  w-20 h-20 rounded-full blur-md animate-bounce bottom-1 right-4'></div>
            <div className='z-10 shadow-lg flex flex-col justify-center max-w-[99vw] w-[360px] md:w-[610px] bg-[#F5F2EE] h-52 border-[#4d2d18] border-2 rounded-lg py-8 relative mb-16 '>
                <span className=' w-4 h-4 rounded-full bg-[#4d2d18] absolute bottom-[200px] left-[351px] md:left-[601px] animate-ping'></span>
                <p className={` ${Com.className} text-[#4d2d18] text-[22px] md:text-4xl w-max mx-auto`}>
                    Library Management System
                </p>
                <div className="w-max mx-auto space-x-8  ">
                  <button className={` ${bar.className} bg-[#4d2d18] text-white w-40 py-2 mt-3 rounded-lg`}>
                    <Link href={'/menu'}>
                      Get Started
                    </Link>
                  </button>
                </div>
            </div>  
        </div>
      </section>
  )
}
