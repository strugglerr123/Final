import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export let SignIn = () => {
  let [username, setusername] = useState("")
  let [email, setemail] = useState("")
  let [passwd, setpasswd] = useState("")
  let [errorr, seterrorr] = useState("")
  let [loading, setloading] = useState(false)
  let navigate = useNavigate()
  // let [show,setshow]=useState({});

  let Get = async (e) => {
    e.preventDefault()
      let b = false
    try {
      setloading(true)
      let Fdata = {username ,email, passwd }
      let res = await fetch("api/auth/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Fdata),
      })

      let data = await res.json()
      // setshow(data);
      console.log(data)
      if (data.success === false) {
        setloading(false)
        seterrorr(data.msg)
        b=true;
      }
      setloading(false)
      // seterrorr(null);
      if(b===false)navigate("/");
    } catch (erro) {
      b=true;
      setloading(false)
      seterrorr(erro.msg)
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
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className='flex mt-3'>
          <p>Have an account ?</p>
          <Link to={"/Sign-up"}>
            <span className='text-blue-600 mx-3'>sign up</span>
          </Link>
        </div>
        {errorr && <p className='text-red-500 mt-5'>{errorr}</p>}
      </div>
    </React.Fragment>
  )
}
