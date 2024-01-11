import { Error } from "mongoose"

export let ErrorHandler=(statuscode,msg)=>{
    let error=new Error();
    error.message=msg;
    error.statusCode=statuscode;
    return error;
}