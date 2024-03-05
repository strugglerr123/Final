import React from "react"
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
  let curr_user = useSelector((state) => state.user);
  // let [updatecurrentuser,setupdatecurrentuser]=React.useState(curr_user.currentuser);
  // console.log(curr_user)

  // React.useEffect(()=>{
  //   setupdatecurrentuser(curr_user.currentuser.rest||curr_user.currentuser);
  // },[updatecurrentuser])

  return (
    <header className='bg-slate-300 shadow-md'>
      <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>
        <Link to={"/"}>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Apna</span>
            <span className='text-slate-700'>Ghar</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='search'
            name='search'
            placeholder='Search.....'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to={"/"}>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {curr_user.currentuser ? (
              <img
                src={curr_user.currentuser.imageurl}
                alt='Error In Loading'
                style={{
                  border: "2px solid green",
                  borderRadius: "100px",
                  height: "45px",
                  marginTop: "-9px",
                  width: "45px",
                }}
              />
            ) : (
              <li className='text-slate-700 hover:underline'>Sign In</li>
            )}
          </Link>
          <Link to={"/Sign-up"}>
            <li className='text-slate-700 hover:underline'>Sign Up</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
