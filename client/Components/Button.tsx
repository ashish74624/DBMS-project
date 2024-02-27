import React from 'react'
import { Button } from "@/Components/ui/button"
import { Barlow } from 'next/font/google'

const bar = Barlow({
  subsets:['latin'],
  weight:'500'
})

interface propType {
    data:string
}

export default function Btn({data}:propType) {
  return (
    <Button className={`${bar.className} bg-[#4d2d18] hover:bg-[#9b5021] text-white text-3xl w-72 h-14 rounded-lg`} >
      {data}
    </Button>
  )
}
