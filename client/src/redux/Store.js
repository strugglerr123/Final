import { combineReducers, configureStore } from "@reduxjs/toolkit"
import user_reducer from "./user/User_Slice"
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"

let  mainroot=combineReducers({user:user_reducer});
let persistConfig={
    key:"root",
    storage,
    version:1
}
let persisitroot=persistReducer(persistConfig,mainroot);

export const store = configureStore({
  reducer: persisitroot,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

export let persistor=persistStore(store);
