import React from "react";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import {sign_in_success} from "../redux/user/User_Slice";

export let GoogleSignIn=()=>{

    let dispatch=useDispatch();

    let Google=async()=>{
        try {
            let provider=new GoogleAuthProvider();
            let auth=getAuth(app);

            let pop_up=await signInWithPopup(auth,provider);
            
            let res = await fetch("api/auth/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: pop_up.user.displayName,
                email: pop_up.user.email,
                photo: pop_up.user.photoURL,
              }),
            })

            let obtained_data=await res.json();
            dispatch(sign_in_success(obtained_data));

        } 
        catch (error) {
            console.log(`Cannot logged to Google ${error}`)
        }
    }

    return(
        <>
            <button type="button" className="border-black bg-green-500 p-3 rounded-lg text-white hover:opacity-80" onClick={Google}>SIGN-IN WITH GOOGLE</button>
        </>
    )
}