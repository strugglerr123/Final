import React from "react";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from "../Firebase";

export let GoogleSignIn=()=>{

    let Google=async()=>{
        try {
            let provider=new GoogleAuthProvider();
            let auth=getAuth(app);

            let pop_up=await signInWithPopup(auth,provider);
            console.log(pop_up);
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