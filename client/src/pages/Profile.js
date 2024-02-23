import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../Firebase"

import {
  UpdateUserFailure,
  UpdateUserSuccess,
  UpdateUserStart,
  DeleteUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  SignOutUserStart,
  SignOutUserFailure,
  SignOutUserSuccess,
} from "../redux/user/User_Slice.js"
// import { json } from "express"
// import { Private_profile } from "../components/Private_profile"

export let Profile = () => {
  let { currentuser } = useSelector((state) => state.user)
  let [uploadedfile, setuploadedfile] = useState(undefined)
  let [imagepercent, setimagepercent] = useState(0)
  let [imageerror, setimageerror] = useState(false)
  let [imageuploadedinfo, setimageuploadedinfo] = useState({})
  let photofile = useRef()

  let dispatch = useDispatch()

  /*console.log(photofile.current)
  console.log(uploadedfile)
  console.log(imagepercent)
  console.log(imageerror);
  console.log(imageuploadedinfo);*/

  console.log("this is ", imageuploadedinfo)

  console.log("That is ", currentuser)
  console.log("Okkkk ", currentuser.rest)

  useEffect(() => {
    if (uploadedfile) {
      // console.log("Yes detected")
      DealWithUploadedfile(uploadedfile)
    }
  }, [uploadedfile])

  let DealWithUploadedfile = (file) => {
    let storage = getStorage(app)
    let filename = new Date().getTime() + file.name
    let storageref = ref(storage, filename)
    let uploadtask = uploadBytesResumable(storageref, file)

    uploadtask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setimagepercent(Math.round(progress))
      },
      (error) => {
        setimageerror(true)
        // let msg=error.message.json;
        // console.log(msg);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadurl) => {
          setimageuploadedinfo({ ...imageuploadedinfo, imageurl: downloadurl })
        })
      }
    )
  }

  let UpdateUserDetail = (e) => {
    setimageuploadedinfo({
      ...imageuploadedinfo,
      [e.target.id]: e.target.value,
    })
    // console.log(e.target._id)
  }

  let SubmitNewUserDetail = async (e) => {
    e.preventDefault()
    try {
      dispatch(UpdateUserStart())
      let res = await fetch(`api/user/update/${currentuser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageuploadedinfo),
      })

      let data = await res.json()

      if (data.success === false) {
        dispatch(UpdateUserFailure(data.msg))
        return
      }

      dispatch(UpdateUserSuccess(data))
    } catch (error) {
      dispatch(UpdateUserFailure(error.msg))
    }
  }

  let Deletaccount = async (req, res, next) => {
    try {
      dispatch(DeleteUserStart())
      let Theuserwas = await fetch(`api/user/delete/${currentuser._id}`, {
        method: "DELETE",
      })
      let data = await Theuserwas.json()
      if (data.success === false) {
        dispatch(DeleteUserFailure(data.msg))
        return
      }

      dispatch(DeleteUserSuccess(data))
    } catch (error) {
      dispatch(DeleteUserFailure(error.msg))
    }
  }

  let Leavinguser = async () => {
    try {
      dispatch(SignOutUserStart())
      let leave = await fetch("api/auth/SignOut")
      let data=await leave.json();
      if(data.success===false){
        dispatch(SignOutUserFailure(data.msg));
        return;
      }
      dispatch(SignOutUserSuccess(data));
    } catch (error) {
      dispatch(SignOutUserFailure(error.msg))
    }
  }

  // console.log(imageuploadedinfo," ",currentuser.imageurl);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div className='text-center text-4xl font-semibold'>
        Welcome{" "}
        <h1 className='inline text-green-500 underline'>
          {currentuser.username}
        </h1>
      </div>
      <form
        action='profile'
        className='flex flex-col gap-3 mt-2'
        onSubmit={SubmitNewUserDetail}
      >
        <input
          type='file'
          onClick={(e) => {
            setuploadedfile(e.target.files[0])
          }}
          ref={photofile}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => photofile.current.click()}
          src={imageuploadedinfo.imageurl || currentuser.imageurl}
          alt='Error in Loading'
          className='h-32 w-32 rounded-[100px] cursor-pointer self-center'
        />
        <p className='self-center'>
          {imageerror ? (
            <span className='text-red-600 font-semibold'>
              {`There Some Error Occured (Must be of size <= 2mb)`}
            </span>
          ) : imagepercent > 0 && imagepercent < 100 ? (
            <span className='text-green-600 font-semibold'>
              Image Uploading Is In progress {imagepercent}
            </span>
          ) : imagepercent === 100 ? (
            <span className='text-green-600 font-semibold'>
              File Uploaded Successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type='username'
          placeholder='Username'
          id='username'
          defaultValue={currentuser.username}
          onChange={UpdateUserDetail}
          className='p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentuser.email}
          onChange={UpdateUserDetail}
          className='p-3 rounded-lg'
        />
        <input
          type='password'
          id='passwd'
          autoComplete='on'
          placeholder='Password'
          onChange={UpdateUserDetail}
          className='p-3 rounded-lg '
        />
        <button
          type='submit'
          className='uppercase font-bold bg-slate-700 p-3 rounded-lg hover:opacity-90 text-white'
        >
          Update
        </button>
      </form>

      <form action='Query' className='flex justify-between mt-4'>
        <span
          className='text-red-600  font-semibold hover:cursor-pointer'
          onClick={Deletaccount}
        >
          Delete Account
        </span>
        <span
          className='text-red-600 font-semibold hover:cursor-pointer'
          onClick={Leavinguser}
        >
          Sign Out
        </span>
      </form>
    </div>
  )
}
