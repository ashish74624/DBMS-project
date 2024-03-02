'use client'
import React ,{useEffect,useState} from 'react'
import Design from '@/Components/Design';


const backend = process.env.BACKEND;


export default function BookDetails() {
    const [book,setBook]:any = useState([]);

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
            <div className="overflow-x-auto z-50">
      <table className="table-auto w-full border-collapse ">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Book Title</th>
            <th className="px-4 py-2 border">Author Name</th>
            <th className="px-4 py-2 border">Publisher Name</th>
            <th className="px-4 py-2 border">No. of Copies</th>
            <th className="px-4 py-2 border">Edition</th>
          </tr>
        </thead>
        <tbody>
          {book.map((book:any) => (
            <tr key={book.actual_Id} className={book.actual_Id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-4 py-2 border">{book.Book_Title}</td>
              <td className="px-4 py-2 border">{book.Author_Name}</td>
              <td className="px-4 py-2 border">{book.Publisher_Name}</td>
              <td className="px-4 py-2 border">{book.No_Of_Copies}</td>
              <td className="px-4 py-2 border">{book.Edition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      </section>
  )
}
