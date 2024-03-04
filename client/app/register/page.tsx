"use client"
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Design from '@/Components/Design';
import toast,{Toaster} from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const backend = process.env.BACKEND;

const schema = z.object({
  Staff_Name: z.string(),
  Staff_Email:z.string().email(),
  password:z.string()
})

type FormField = z.infer<typeof schema>

export default function Register() {
  const router = useRouter();
  const {register ,handleSubmit, setError, formState:{errors,isSubmitting} } = useForm<FormField>({
    resolver:zodResolver(schema)
  });

  const onSubmit:SubmitHandler<FormField>=async(data)=>{
    try{
      const res = await fetch(`${backend}/staff/register`,{
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(data)
      });
      const output = await res.json();
      if(!output.done){
        throw output.msg
      }else{
        router.push('/login');
      }
    }catch(err:any){
      setError('root',{
        message:err
      })
    }
  }

  return (
    <>
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
      <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] z-50 rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <Design/>
           <form onSubmit={handleSubmit(onSubmit)} className="bg-white z-50 w-80 h-max  shadow-lg rounded-lg flex flex-col items-center pb-6">
            <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4">Register Staff</h2>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
                  <input {...register("Staff_Name")} type="text" id="Staff_Name" name="Staff_Name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
                  <label htmlFor="Staff_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Staff name</label>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
              <input {...register("Staff_Email")} type="email" name="Staff_Email" 
              className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
              <label htmlFor="Staff_Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
              <input {...register("password")} type="password" name="password" id="password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 text-white px-16 rounded-full py-2 font-GraphikBlack">
              {isSubmitting ? 'Loading...':"Submit"}
            </button>
            <p className=" text-sm font-meduim font-GraphikBlack text-black mt-2">Already have an account ?
            <Link href={'/login'}><span className="text-[#0FADFF]"> Log in</span> </Link> </p>
            {errors.root && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.root?.message}</div> }
          {errors.Staff_Email && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.Staff_Email?.message}</div> }
          {errors.password && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.password?.message}</div> }
          </form>
        </div>
        <Toaster />
      </section>
    </>
  )
}
