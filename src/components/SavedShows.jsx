import React, { useEffect, useState } from 'react'
import { MdChevronLeft,MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { updateDoc,doc,onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'

const SavedShows = () => {

    const [movies,setMovies]=useState([])
    const {user}=UserAuth()

        //for sliding left
        const slideLeft=()=>{
        var slider=document.getElementById('slider')
        slider.scrollLeft=slider.scrollLeft - 500;
        }
        //for sliding right
        const slideRight=()=>{
        var slider=document.getElementById('slider')
        slider.scrollLeft=slider.scrollLeft + 500;
        }

        useEffect(()=>{
            onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
                setMovies(doc.data()?.savedShows)
            })
        },[user?.email])

        const movieRef=doc(db,'users',`${user.email}`)
        const deleteShow=async(passedId)=>{

      //in case of firebase it wont allow us to delete an item from an array on the server side
      //so we have to handle it on the client side 
      //so we will copy all the id except the id which we passed to delete - we are removing the id using the filter function
      

            try {
                const result=movies.filter((item)=>item.id !== passedId);
                await updateDoc(movieRef,{
                    savedShows:result,
                })
            } catch (error) {
                console.log(error)
            }
        }

  return (
    <>
    <div>
        <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
        <div className='relative flex items-center group'>
            
            <MdChevronLeft onClick={slideLeft} className=' left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block' size={40}/>

            <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {movies.map((item,id)=>(

                    <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                    <img
                    className="w-full h-auto block"
                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                    alt={item?.title}
                    />
                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center  h-full items-center text-center">
                        {item.title}
                    </p>
                    <p onClick={()=>deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose/></p>
                    
                    </div>
                    </div>

                    

                ))}
            </div>

            <MdChevronRight onClick={slideRight} className=' right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block' size={40}/>

        </div>
        
    </div>

    
    </>
  )
}

export default SavedShows