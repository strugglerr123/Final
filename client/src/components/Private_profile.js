import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

export let Private_profile = () => {
  let { currentuser } = useSelector((state) => state.user)
  //   console.log(currentuser.username)
  return currentuser ? <Outlet /> : <Navigate to={"/sign-in"} />
}
