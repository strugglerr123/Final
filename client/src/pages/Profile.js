import React from "react"
import { useSelector } from "react-redux"
// import { Private_profile } from "../components/Private_profile"

export let Profile = () => {
  let { currentuser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-4xl '>
        Welcome{" "}
        <h1 className='inline text-green-500 underline'>
          {currentuser.username}
        </h1>
      </h1>
      <form action='profile' className='flex flex-col gap-3 mt-2'>
        <img
          src={currentuser.imageurl}
          alt='Error in Loading'
          className='h-32 w-32 rounded-[100px] cursor-pointer self-center'
        />
        <input
          type='username'
          placeholder='Username'
          className='p-3 rounded-lg'
        />
        <input type='email' placeholder='email' className='p-3 rounded-lg' />
        <input
          type='passwd'
          placeholder='password'
          className='p-3 rounded-lg '
        />
        <button className='uppercase font-bold bg-slate-700 p-3 rounded-lg hover:opacity-90 text-white'>
          Update
        </button>
      </form>

      <form action='Query' className='flex justify-between mt-4'>
        <span className='text-red-600  font-semibold'>Delete Account</span>
        <span className='text-red-600 font-semibold'>Sign Out</span>
      </form>
    </div>
  )
}
