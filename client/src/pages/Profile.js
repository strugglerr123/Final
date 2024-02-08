import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../Firebase"
// import { Private_profile } from "../components/Private_profile"

export let Profile = () => {
  let { currentuser } = useSelector((state) => state.user)
  let [uploadedfile, setuploadedfile] = useState(undefined)
  let [imagepercent, setimagepercent] = useState(0)
  let [imageerror, setimageerror] = useState(false)
  let [imageuploadedinfo, setimageuploadedinfo] = useState({})
  let photofile = useRef()

  /*console.log(photofile.current)
  console.log(uploadedfile)
  console.log(imagepercent)
  console.log(imageerror);
  console.log(imageuploadedinfo);*/

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
        setimageerror(true);
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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div className='text-center text-4xl font-semibold'>
        Welcome{" "}
        <h1 className='inline text-green-500 underline'>
          {currentuser.username}
        </h1>
      </div>
      <form action='profile' className='flex flex-col gap-3 mt-2'>
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
          src={currentuser.imageurl}
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
          ) : imagepercent === 100? (
            <span className='text-green-600 font-semibold'>
              File Uploaded Successfully
            </span>
          ) : ""}
          
        </p>
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
