import { configureStore } from "@reduxjs/toolkit"
import user_reducer from "./user/User_Slice"
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"

export const store = configureStore({
  reducer: {user:user_reducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})
