import React from "react";
import {Link} from "react-router-dom"

export let SignUp = () => {
  return (
    <React.Fragment>
      <div className='max-w-lg mx-auto p-3'>
        <h1 className='text-3xl text-center font-semibold mt-7'>
          Welcome To Sign-Up Page
        </h1>
        <form action='Sign-up' className='flex flex-col gap-4 mt-8 '>
          <input
            type='username'
            id='username'
            className='border p-3 rounded-lg'
            placeholder='username'
          />
          <input
            type='email'
            id='email'
            className='border p-3 rounded-lg'
            placeholder='email'
          />
          <input
            type='passwd'
            id='passwd'
            className='border p-3 rounded-lg'
            placeholder='password'
          />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>
            Sign up
          </button>
        </form>
        <div className='flex mt-3'>
          <p>Have an account ?</p>
          <Link to={"/Sign-up"}>
            <span className="text-blue-600 mx-3">sign in</span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
