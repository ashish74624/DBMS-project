'use client'
import React ,{useEffect,useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import toast, { Toaster } from 'react-hot-toast';
import Design from '@/Components/Design';

const schema = z.object({
    Author_Name: z.string(),
    Title: z.string(),
    Publisher_Name: z.string(),
    Copies: z.number(),
    Edition: z.number()
});

const backend = process.env.BACKEND;


type FormField = z.infer<typeof schema>

export default function EnterBook() {
    const [publishers,setPublishers]:any = useState();
    const {register,handleSubmit, formState:{isSubmitting,errors}} = useForm<FormField>(
        {resolver:zodResolver(schema)}
    );

    async function getPublishers(){
        const res = await fetch(`${backend}/pub/getPublishers`);
        const data = await res.json();
        setPublishers(data.publisher);
    }

    useEffect(()=>{
        getPublishers();
    },[])

    const onSubmit:SubmitHandler<FormField> = async(data)=>{
        try {
            const res = await fetch(`${backend}/book/addBook`,{
                method:'POST',
                headers:{
                    'Content-Type':'Application/json'
                },
                body:JSON.stringify(data)
            });
            const dataMsg = await res.json();
            if(dataMsg){
                toast(dataMsg.message);
            }
        } catch (error) {
            toast.error("Book Addition unsuccesful");
        }
    }

  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
      <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <Design/>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white relative z-10 h-max rounded-lg shadow-lg w-80 flex flex-col pt-2 px-6 pb-6 '>
                <h1 className='w-max mx-auto mb-2 text-2xl text-[#4d2d18] ' >Enter Book Details</h1>
                <label className='mt-2' htmlFor="Title">Book Title</label>
                <input {...register('Title')} className='bg-gray-100 rounded-md border py-1 px-2 ' type="text" />
                <label className='mt-2' htmlFor="Author_Name">Author Name</label>
                <input {...register('Author_Name')} className='bg-gray-100 rounded-md border py-1 px-2 ' type="text" />
                <label className='mt-2' htmlFor="Publisher_Name">Enter Publisher</label>
                <select className='bg-gray-100 rounded-md border py-1 px-2 '  {...register('Publisher_Name')}>
                    <option value={"Select Options"}>
                        Select Options
                    </option>
                    {
                    publishers
                    ?
                    publishers.map((option:any)=>
                        <option key={option._id} value={option.Publisher_Name}>
                            {option.Publisher_Name}
                        </option>
                    )
                    :
                    <option value={"No Publisher Found"}>
                        No Publisher Found
                    </option>
                    }
                </select>
                <label className='mt-2' htmlFor="Copies" >No. Of Copies</label>
                <input type="number" {...register('Copies',{ valueAsNumber: true })} className='bg-gray-100 rounded-md border py-1 px-2 '  />
                <label className='mt-2' htmlFor="Edition">Edition</label>
                <input type="number" {...register('Edition',{valueAsNumber:true})} className='bg-gray-100 rounded-md border py-1 px-2 '  />
                <button disabled={isSubmitting} type='submit' className='mt-4 w-full bg-[#4d2d18] text-white py-2 rounded-lg'>
                    {isSubmitting ? "Loading...":"Enter Book"} 
                </button>
            </form>
        </div>
        <Toaster />
      </section>
  )
}
