'use client'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import toast, { Toaster } from 'react-hot-toast';

const backend = process.env.BACKEND;

const schema= z.object({
    name: z.string()
})

type FormField = z.infer<typeof schema>;

export default function Publisher() {

    const { register , handleSubmit , formState:{isSubmitting} } = useForm<FormField>({
        resolver:zodResolver(schema)
    });

    const onSubmit:SubmitHandler<FormField> = async(data)=>{
        try{
            const res = await fetch(`${backend}/pub/addPublisher`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const datamsg = await res.json();
            if(datamsg){
                toast.success(datamsg.message);
            }
        }catch(err){
            toast.error("Publisher not added");
        }
    }

  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
      <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <div className='bg-[#4d2d18] absolute  w-80 h-80 rounded-full bottom-[75vh] right-[85vw]  hover:w-96 hover:h-96 transition-all'></div>
            <div className='bg-[#4d2d18] absolute  w-80 h-80 rounded-full top-[75vh] left-[85vw]  hover:w-96 hover:h-96 transition-all'></div>
            <div className={` w-[2px] h-[500px] bg-[#4d2d18] absolute top-0 right-0 rotate-45 origin-top `}></div>
            <div className=" w-[2px] h-[500px] bg-[#4d2d18] absolute top-[50vh] rotate-45 left-[300px] origin-top"></div>
            <div className=' absolute  w-20 h-20 rounded-full blur-md animate-bounce bottom-1 right-4'></div>
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-white w-80 rounded-lg flex flex-col items-center p-6 h-max pb-7 shadow-lg' >

                <label className='text-[#4d2d18] text-2xl ' htmlFor="name">Enter Publisher Name</label>
                <input {...register('name')} type="text" name='name' className='w-full bg-gray-50 border border-black px-2 rounded-lg mt-4 py-2' />
                <button disabled={isSubmitting} type='submit' className='mt-4 w-full bg-[#4d2d18] text-white py-2 rounded-lg'>
                    {isSubmitting ? "Loading...":"Add Publisher"} 
                </button>
            </form> 
        </div>
        <Toaster />
      </section>
  )
}
