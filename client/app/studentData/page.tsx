'use client'
import React ,{useEffect,useState} from 'react'
import Design from '@/Components/Design';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"



const backend = process.env.BACKEND;


export default function StudentData() {
    const [student,setStudent]:any = useState();

    async function getAllLoans() {
        const res = await fetch(`${backend}/loan/getStudentLoans`);
        const data = await res.json();
        setStudent(data.students); 
    }

    useEffect(()=>{
        getAllLoans();
    },[])

    function formatDate(inputDate: string): string {
    const date: Date = new Date(inputDate);

    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();

    return formattedDay + '-' + formattedMonth + '-' + year;
    
    }

  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
        <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <Design/>
            <div className='bg-white w-max h-max p-4 z-50 place-items-center rounded-lg grid grid-cols-3'>
                <p className='text-lg font-bold'>Student Id</p> 
                <p className='text-lg font-bold'>Student Name</p>
                <p className='text-lg font-bold'>No. of Books Borrowed</p>

                {/* ---------------- */}
                {
                    student
                    ?
                    student.map((student:any)=>
                        <>
                            <p>{student.Student_Id}</p>
                            <p>{student.Student_Name}</p>
                            <p className='hover:text-blue-600 cursor-pointer hover:underline'>
                                <Dialog>
                                    <DialogTrigger>
                                        {student.books.length}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                        <DialogTitle>{student.Student_Name} - Books details</DialogTitle>
                                        <DialogDescription className='grid grid-cols-2 place-items-center'>
                                            <p className='font-bold'>Book Title</p>
                                            <p className='font-bold'>Return Date</p>
                                            {
                                                student.books.map((book:any)=>
                                                    <>
                                                        <p>{book.Book_Title}</p>
                                                        <p>{formatDate(book.Return_Date)}</p>
                                                    </>
                                                )
                                            }
                                        </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </p>
                        </>
                    )
                    :
                    <>
                        <p>No Data</p>
                        <p>Available</p>  
                        <p>yet</p>
                    </>
                }

            </div>
        </div>
      </section>
  )
}
