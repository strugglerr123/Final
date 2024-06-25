import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import ReactLoading from "react-loading";
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import "swiper/css/bundle"

export let  UserListing=()=> {
    SwiperCore.use([Navigation]);
    let params = useParams();
    let [details,setdetails]=useState(null);
    let [error,seterror]= useState(false);
    let [loading,setloading]=useState(false);
    useEffect(()=>{
        let Fetch_data=async ()=>{
            try {
                setloading(true);
                
                let res = await fetch(`/api/listing/showlist/${params.id}`)
                let data=await res.json();
                if(data.success===false){
                    seterror(true)
                    return;
                }
                setdetails(data);
                setloading(false);
                seterror(false)
            }
            catch (error) {
                seterror(true)
                setloading(false);
            }
            
        }
        console.log(details);
        Fetch_data();
        // console.log(loading)
    },[params.id])
  return (
    <main className=''>
      {loading && (
        <div className='flex justify-center'>
          <ReactLoading type='spin' color='lime' height={200} width={100} />
        </div>
      )}
      {error && (
        <h1 className='text-red-700 text-2xl flex justify-center mt-10'>Something Went Wrong ..</h1>
      )}
      {details && !loading && !error && (
        <div className=''>
          <Swiper navigation>
            {details.imageurl.map((ele) => {
              return (
                <SwiperSlide key={ele}>
                  <div
                    className='h-[350px]'
                    style={{ background: `url(${ele}) center no-repeat`, backgroundSize: 'cover' } }
                  ></div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
    </main>
  )
}
