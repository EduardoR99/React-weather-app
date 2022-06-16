import React from 'react'
import { Cities } from './data';

const TopBtns = ({setQuery}) => {

  return (
    <div className='flex items-center justify-around my-6'>
        {Cities.map((city) => (
            <button key={city.id} className='text-white text-lg font-medium'
            onClick={()=>setQuery({q: city.title})}>{city.title}</button>
        ))}
    </div>
  )
}

export default TopBtns