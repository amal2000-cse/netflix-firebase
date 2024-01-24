import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import { MdChevronRight,MdChevronLeft } from 'react-icons/md';

const Row = ({title,fetchURL,rowID}) => {
    const [movies,setMovies]=useState([]);

    useEffect(()=>{
        axios.get(fetchURL).then((response)=>{
            setMovies(response.data.results)
        })
    },[fetchURL])

    // console.log(movies)

    //for sliding left
    const slideLeft=()=>{
                                         //rowID with this it will be able to understand which row it want to scroll
        var slider=document.getElementById('slider' + rowID)
        slider.scrollLeft=slider.scrollLeft - 500;
    }
    //for sliding right
    const slideRight=()=>{
        var slider=document.getElementById('slider' + rowID)
        slider.scrollLeft=slider.scrollLeft + 500;
    }


  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
        <div className='relative flex items-center group'>
            
            <MdChevronLeft onClick={slideLeft} className=' left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block' size={40}/>

            <div id={'slider'+rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {movies.map((item,id)=>(

                    <Movie key={id} item={item}/>
                    

                ))}
            </div>

            <MdChevronRight onClick={slideRight} className=' right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block' size={40}/>

        </div>

    </>        
  )
}

export default Row