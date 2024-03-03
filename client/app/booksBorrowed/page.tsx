'use client'
import React ,{useEffect,useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import toast, { Toaster } from 'react-hot-toast';
import Design from '@/Components/Design';


const backend = process.env.BACKEND;


export default function BooksBorrowed() {
    const [book,setBook]:any = useState([]);

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
            <div className="overflow-x-auto z-50">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-[#4d2d18] ">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Student Name</th>
            <th className="px-4 py-2 border">Book Title</th>
            <th className="px-4 py-2 border">Issue Date</th>
            <th className="px-4 py-2 border">Return Date</th>
          </tr>
        </thead>
        <tbody>
          {book.map((book:any) => (
            <tr key={book.actual_Id} className={book.actual_Id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-4 py-2 border">{book.actual_Id}</td>
              <td className="px-4 py-2 border">{book.Student_Name}</td>
              <td className="px-4 py-2 border">{book.Book_Title}</td>
              <td className="px-4 py-2 border">{formatDate(book.Issue_Date)}</td>
              <td className="px-4 py-2 border">{formatDate(book.Return_Date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        <Toaster />
      </section>
  )
}
