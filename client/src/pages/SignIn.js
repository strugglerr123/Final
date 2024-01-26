import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {sign_in_start,sign_in_success,sign_in_failure} from "../redux/user/User_Slice";
import { GoogleSignIn } from "../components/Google_Sign_in";

export let SignIn = () => {
  let [username, setusername] = useState("")
  let [email, setemail] = useState("")
  let [passwd, setpasswd] = useState("")
  let {loading , error}=useSelector((state)=>state.user)
  let navigate = useNavigate()
  let dispatch=useDispatch();
  // let [show,setshow]=useState({});

  let Get = async (e) => {
    e.preventDefault()
      let b = false
    try {
      dispatch(sign_in_start())
      let Fdata = {username ,email, passwd };
      let res = await fetch("api/auth/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Fdata),
      })

      let data = await res.json()
      // errorr=data.msg;
      // setshow(data);
      console.log(data)
      if (data.success === false) {
        dispatch(sign_in_failure(data.msg));
        // errorr=data.msg;
        b=true;
      }
      // seterrorr(null);
      if(b===false){
        dispatch(sign_in_success(data));
        navigate("/");
      }
    } catch (erro) {
      b=true;
     dispatch(sign_in_failure(erro.msg));
    //  errorr=erro.msg
    }
  }
  return (
    <React.Fragment>
      <div className='max-w-lg mx-auto p-3'>
        <h1 className='text-3xl text-center font-semibold mt-7'>
          Welcome To Sign-In Page
        </h1>
        <form
          action='Sign-in'
          className='flex flex-col gap-4 mt-8 '
          onSubmit={Get}
        >
          <input
            type='email'
            id='email'
            className='border p-3 rounded-lg'
            placeholder='email'
            value={email}
            onChange={(e) => {
              setemail(e.target.value)
            }}
          />
          <input
            type='passwd'
            id='passwd'
            className='border p-3 rounded-lg'
            placeholder='password'
            value={passwd}
            onChange={(e) => {
              setpasswd(e.target.value)
            }}
          />
          <button
            disabled={loading}
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        <GoogleSignIn/> 
        </form>
        <div className='flex mt-3'>
          <p>Have an account ?</p>
          <Link to={"/Sign-up"}>
            <span className='text-blue-600 mx-3'>sign up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </React.Fragment>
  )
}
