'use client'
import React ,{useEffect,useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import toast, { Toaster } from 'react-hot-toast';
import Design from '@/Components/Design';


const backend = process.env.BACKEND;


export default function BooksBorrowed() {
    const [book,setBook]:any = useState();

    async function getAllLoans() {
        const res = await fetch(`${backend}/loan/getAllLoans`);
        const data = await res.json();
        setBook(data.loans); 
    }

    useEffect(()=>{
        getAllLoans();
    },[])

    function formatDate(inputDate: string): string {
    // Create a new Date object from the input string
    const date: Date = new Date(inputDate);

    // Extract day, month, and year from the Date object
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // January is 0, so we add 1
    const year: number = date.getFullYear();

    // Add leading zeros if needed
    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();

    // Return the formatted date string
    return formattedDay + '-' + formattedMonth + '-' + year;
}


  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
      <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <Design/>
            <div className='bg-white w-max h-max grid z-50 grid-cols-5 place-items-center'>
                  <p className='  text-lg font-bold'>Student Id</p>
                  <p className='  text-lg font-bold'>Student Name</p>
                  <p className='  text-lg font-bold'>Book Title</p>
                  <p className='  text-lg font-bold'>Issue Date</p>
                  <p className='  text-lg font-bold'>Return Date</p>
                  {/* ---- */}
                  {
                  book 
                  ?
                  book.map((book:any)=>
                    
                  <>
                    <p className=' '>{book.ID}</p>
                    <p className=' '>{book.Student_Name}</p>
                    <p className=' '>{book.Book_Title}</p>
                    <p className=' '>{formatDate(book.Issue_Date)}</p>
                    <p className=' '>{formatDate(book.Return_Date)}</p>
                  </>
                  )
                  :
                  <></>}
            </div>
        </div>
        <Toaster />
      </section>
  )
}
