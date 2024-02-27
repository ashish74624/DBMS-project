'use client'
import React ,{useEffect,useState} from 'react'
import Design from '@/Components/Design';


const backend = process.env.BACKEND;


export default function BookDetails() {
    const [book,setBook]:any = useState();

    async function getAllLoans() {
        const res = await fetch(`${backend}/book/getAllBooks`);
        const data = await res.json();
        setBook(data.books); 
    }

    useEffect(()=>{
        getAllLoans();
    },[])


  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-hidden '>
        <div className='bg-[#F5F2EE] shadow-2xl h-full w-full border-[#4d2d18] rounded-lg border-4 overflow-hidden relative flex justify-center items-center'>
            <Design/>
            <div className='bg-white w-max h-max p-4 z-50 place-items-center rounded-lg grid grid-cols-5'>
                <p className='text-lg font-bold'>Book Title</p>
                <p className='text-lg font-bold'>Author Name</p>
                <p className='text-lg font-bold'>Publisher Name</p>
                <p className='text-lg font-bold'>No Of Copies</p>
                <p className='text-lg font-bold'>Edition</p>

                {/* ---------------- */}
                {
                    book
                    ?
                    book.map((book:any)=>
                        <>
                            <p>{book.Book_Title}</p>
                            <p>{book.Author_Name}</p>
                            <p>{book.Publisher_Name}</p>
                            <p>{book.No_Of_Copies}</p>
                            <p>{book.Edition}</p>
                        </>
                    )
                    :
                    <></>
                }

            </div>
        </div>
      </section>
  )
}
