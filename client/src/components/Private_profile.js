import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

export let Private_profile = () => {
  let { currentuser } = useSelector((state) => state.user);
  // let [bool,setbool]=React.useState(0);
  // React.useEffect(()=>{
  //   if(currentuser)setbool(1);
  // },[])
  return(
  <>
    {currentuser ? <Outlet/> : <Navigate to={"/sign-in"} />}
    {/* {bool?<Profile data={currentuser.imageurl} />:null} */}
  </>
  )
}
