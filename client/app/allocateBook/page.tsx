"use client"
import React, { useEffect, useState } from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import toast, { Toaster } from 'react-hot-toast';
import Design from '@/Components/Design';

const schema = z.object({
    Student_ID:z.number(),
    Book_Title: z.string(),
    Issue_Date: z.date(),
    Return_Date: z.date()
});

const backend = process.env.BACKEND;


type FormField = z.infer<typeof schema>

export default function AllocateBook() {
    const [student,setStudent]:any[] = useState();
    const [books,setBooks]:any[] = useState();

    const {register,handleSubmit, formState:{isSubmitting}} = useForm<FormField>(
        {resolver:zodResolver(schema)}
    );

    async function getAllStudents() {
        const res = await fetch(`${backend}/student/getAllStudents`);
        const data = await res.json();
        setStudent(data.student);
    }

    async function getAllBooks() {
        const res = await fetch(`${backend}/book/getAllBooks`);
        const data = await res.json();
        setBooks(data.books);
    }

    useEffect(()=>{  
        getAllStudents();
        getAllBooks();
    },[])

    const onSubmit:SubmitHandler<FormField> = async(data)=>{
        try {
            const res = await fetch(`${backend}/loan/addLoan`,{
                method:'POST',
                headers:{
                    'Content-Type':'Application/json'
                },
                body:JSON.stringify(data)
            });
            const dataMsg = await res.json();
            if(dataMsg){
                toast.success("Book Allocated");
            }
        } catch (error) {
            toast.error("Book not Allocated");
        }
    }

  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
      <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <Design/>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white relative z-10 h-max rounded-lg shadow-lg w-80 flex flex-col pt-2 px-6 pb-6 '>
                <h1 className='w-max mx-auto mb-2 text-2xl text-[#4d2d18] ' >Enter Allocation Details</h1>
                <label className='mt-2' htmlFor="Student_ID" >Student Id</label>
                <select {...register('Student_ID',{valueAsNumber:true})}  className='bg-gray-100 rounded-md border py-1 px-2 '>
                    <option value={1}>
                        --Select Student Id--
                    </option>
                    {student
                    ?

                        student?.map((student:any)=>
                        <option value={student.Student_ID} key={student.Student_ID} >
                            {student.Student_ID}
                        </option>
                    )
                    :
                    <option value={0}>
                        No Students Registered yet
                    </option>
                    }
                </select>
                <label className='mt-2' htmlFor="Book_Title">Book Title</label>
                <select {...register('Book_Title')} className='bg-gray-100 rounded-md border py-1 px-2'>

                    <option value={1}>
                        --Select Book--
                    </option>
                    {books
                    ?
                    
                    books?.map((book:any)=>
                    <option value={book.Book_Title} key={book.Book_Title} >
                            {book.Book_Title}
                        </option>
                    )
                    :
                    <option value={0}>
                        No Books available yet
                    </option>
                    }
                </select>
                <label className='mt-2' htmlFor="Semester" >Semester</label>
                <input type="date" {...register('Issue_Date',{valueAsDate:true})} className='bg-gray-100 rounded-md border py-1 px-2 '  />
                <label className='mt-2' htmlFor="Return_Date" >Return Date</label>
                <input type="date" {...register('Return_Date',{valueAsDate:true})} className='bg-gray-100 rounded-md border py-1 px-2 '  />
                <button disabled={isSubmitting} type='submit' className='mt-4 w-full bg-[#4d2d18] text-white py-2 rounded-lg'>
                    {isSubmitting ? "Loading...":"Register Student"} 
                </button>
            </form>
        </div>
        <Toaster />
      </section>
  )
}
