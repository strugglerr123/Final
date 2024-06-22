import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate,useParams } from "react-router-dom"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../Firebase.js"

export default function Listing() {
  let [files, setfiles] = React.useState([])
  let { currentuser } = useSelector((state) => state.user)
  let navigate = useNavigate()
  let params=useParams();
  let [formdata, setformdata] = React.useState({
    imageurl: [],
    name: "",
    descriptions: "",
    address: "",
    originalprice: 0,
    sellingprice: 0,
    quantity: 0,
    refurbunished: false,
    deliverable: false,
    sell: false,
    buy: false,
    offer: false,
    type: "",
  })

  let [imageerror, setimageerror] = React.useState(false)

  let [progress, setprogress] = React.useState(null)

  let [Error, SetError] = React.useState(null)

  let [Loading, setLoading] = React.useState(false)

//   console.log("The uploaded files are .... ", files)
  useEffect(()=>{
    let Listdata=async ()=>{
        let list_id=params.id;
        // console.log(list_id)
        let res = await fetch(`/api/listing/showlist/${list_id}`)
        let data=await res.json();

        if(data.success===false){
            console.log(data.msg);
            return;
        }
        setformdata(data);
    }
    Listdata();
  },[])

  let Storefile = (e) => {
    if (files.length > 0 && files.length + formdata.imageurl.length <= 6) {
      let allfiles = []
      for (let i = 0; i < files.length; i++) {
        allfiles.push(Upload_one_one(files[i]))
      }

      Promise.all(allfiles)
        .then((urls) => {
          setformdata({ ...formdata, imageurl: formdata.imageurl.concat(urls) })
          setimageerror(false)
        })
        .catch((err) => {
          setimageerror(`Image Must be of apropriate size ${err}`)
        })
    } else {
      setimageerror(
        `Error because of ${formdata.imageurl.length} is max or min than expected one !!!!!!`
      )
    }
  }

  let Upload_one_one = async (file) => {
    return new Promise((resolve, reject) => {
      let storage = getStorage(app)
      let filename = new Date().getTime() + file.name
      let storageref = ref(storage, filename)
      let uploadfile = uploadBytesResumable(storageref, file)

      uploadfile.on(
        "state_changed",
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`completed ${Math.round(progress)}`)
          setprogress(Math.round(progress))
        },

        (error) => {
          reject(error)
        },

        () => {
          getDownloadURL(uploadfile.snapshot.ref).then((foundurl) => {
            resolve(foundurl)
          })
        }
      )
    })
  }

  let deleteuploadedphoto = (index) => {
    setformdata({
      ...formdata,
      imageurl: formdata.imageurl.filter((u, i) => {
        return i !== index
      }),
    })
  }

  let Changeed_name = (e) => {
    // console.log(` oooooooooooo  `,e.target);

    if (e.target.id === "sell" || e.target.id === "buy") {
      if (e.target.id === "sell") {
        setformdata({
          ...formdata,
          buy: false,
          [e.target.id]: e.target.checked,
          type: e.target.id,
        })
      } else {
        setformdata({
          ...formdata,
          sell: false,
          [e.target.id]: e.target.checked,
          type: e.target.id,
        })
      }
    }

    if (
      e.target.id === "refurbunished" ||
      e.target.id === "offer" ||
      e.target.id === "deliverable"
    ) {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.checked,
      })
    }

    if (
      e.target.id === "name" ||
      e.target.id === "address" ||
      e.target.id === "descriptions" ||
      e.target.id === "quantity" ||
      e.target.id === "originalprice" ||
      e.target.id === "sellingprice"
    ) {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.value,
      })
    }
  }

  let FormSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formdata.imageurl.length < 1) {
        SetError(`Upload Atleast 1 Photo ..........`)
        return
      } else if (formdata.imageurl.length >= 7) {
        SetError(`Number Of Images Must be less than 7`)
        return
      }
      setLoading(true)
      SetError(false)
      let res = await fetch(`/api/listing/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formdata,
          userref: currentuser._id,
        }),
      })
      let data = await res.json()
      setLoading(false)
      if (data.success === false) {
        SetError(data.msg)
      }
      // console.log(data);
      navigate(`/listing/${data._id}`)
    } catch (error) {
      SetError(error.msg)
      setLoading(false)
    }
  }

  React.useEffect(() => {}, [progress])

  // console.log(`Input Datas are ..... `,formdata)

  return (
    <main className=' p-2 max-w-4xl mx-auto'>
      <h1 className='my-2 flex flex-col uppercase font-semibold text-center text-4xl'>
        Update listing
      </h1>
      <form
        action='listing'
        className='flex flex-col sm:flex-row'
        onSubmit={FormSubmit}
      >
        <div className='flex flex-col gap-2 flex-1 mr-10'>
          <input
            type='text'
            placeholder='Name'
            className='border p-2 rounded-lg text-center'
            id='name'
            maxLength={"30"}
            minLength={"4"}
            value={formdata.name}
            onChange={Changeed_name}
            required
          />
          <textarea
            type='text'
            placeholder='Descriptions'
            className='border p-3 rounded-lg text-center'
            id='descriptions'
            value={formdata.descriptions}
            onChange={Changeed_name}
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg text-center'
            id='address'
            value={formdata.address}
            onChange={Changeed_name}
            required
          />
          <input
            type='text'
            placeholder='Type'
            className='border p-3 rounded-lg text-center'
            id='type'
            value={formdata.type}
            onChange={Changeed_name}
            required
          />
          <div className=' flex gap-3 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='refurbunished'
                id='refurbunished'
                checked={formdata.refurbunished}
                onChange={Changeed_name}
                className='w-5'
              />
              <span>Refurbunished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='deliverable'
                id='deliverable'
                className='w-5'
                checked={formdata.deliverable}
                onChange={Changeed_name}
              />
              <span>Deliverable</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='sell'
                id='sell'
                className='w-5'
                checked={formdata.sell}
                onChange={Changeed_name}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='buy'
                id='buy'
                className='w-5'
                checked={formdata.buy}
                onChange={Changeed_name}
              />
              <span>buy</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='offer'
                id='offer'
                className='w-5'
                checked={formdata.offer}
                onChange={Changeed_name}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                name='originalprice'
                id='originalprice'
                className='p-2 border border-grey-400 rounded-lg w-20'
                value={formdata.originalprice}
                onChange={Changeed_name}
              />
              <span>Originalprice</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                name='sellingprice'
                id='sellingprice'
                value={formdata.sellingprice}
                onChange={Changeed_name}
                className='p-2 border border-grey-400 rounded-lg w-20 '
              />
              <span>Sellingprice</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                name='quantity'
                id='quantity'
                value={formdata.quantity}
                onChange={Changeed_name}
                className='p-2 border border-grey-400 rounded-lg w-20'
              />
              <span>Quantity</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-5'>
          <p className=' font-semibold'>
            Images:
            <span className='font-normal text-gray-500 ml-2'>
              First Image will cover (max-6)
            </span>
          </p>
          <div className='flex gap-3'>
            <input
              type='file'
              id='images'
              // key={1}
              accept='images/*'
              multiple
              className='P-2 border border-gray-600 rounded w-full self-center'
              onClick={(e) => {
                setfiles(e.target.files)
              }}
            />
            <button
              type='button'
              // key={2}
              className='p-[1.5] text-red-400 border border-red-600 uppercase hover:shadow-lg disabled:opacity-70 rounded'
              onClick={Storefile}
            >
              upload
            </button>
            <p className='text-center'>
              {imageerror ? (
                <span className='text-red-600'>{imageerror}</span>
              ) : (
                <span className='text-green-600'>{progress}</span>
              )}
            </p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {formdata.imageurl.map((u, i) => (
              <div className='text-center'>
                <img
                  key={i}
                  src={u}
                  alt='Error In Loading'
                  className='h-36 w-56 rounded-lg'
                />
                <button
                  key={1}
                  type='button'
                  onClick={() => {
                    deleteuploadedphoto(i)
                  }}
                  className='font-bold text-red-500 border-red-400 border-[1px] rounded-lg bg-red-100 mt-2'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button className='border border-blue-700 bg-blue-200 hover:opacity-85 p-3 rounded-lg hover:shadow-md uppercase'>
            {Loading ? <p>Updating......</p> : <p>Update</p>}
          </button>
          {Error ? <p className='text-red-500'>{Error}</p> : null}
        </div>
      </form>
    </main>
  )
}
