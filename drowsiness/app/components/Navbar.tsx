import React from 'react'
import Link from 'next/link'
function Navbar() {
  return (
    <div className='w-[80%] mx-auto mt-5 flex justify-between text-gray-800'>

    <p className='font-semibold text-2xl font-serif text-black'>EyeWatch</p>
      <ul className='flex gap-20 items-center font-medium  font-serif text-xl' >
        <li className='hover:text-gray-500'>
            <Link href={"/contact"}>contact</Link>
        </li>
        <li className='hover:text-gray-500'>
            <Link href={"/pricing"}>pricing</Link>
        </li>
        <li className='hover:text-gray-500'>
            <Link href={"/map"}>mapsection</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
