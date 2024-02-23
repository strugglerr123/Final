import { createSlice } from "@reduxjs/toolkit"

let initialState = {
  currentuser: null,
  error: null,
  loading: false,
}

let User_Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sign_in_start: (state) => {
      state.loading = true
    },
    sign_in_success: (state, action) => {
      state.currentuser = action.payload
      state.loading = false
      state.error = null
    },
    sign_in_failure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    UpdateUserStart: (state) => {
      state.loading = true
    },

    UpdateUserSuccess: (state, action) => {
      state.currentuser = action.payload
      state.loading = false
      state.error = null
    },

    UpdateUserFailure: (state, action) => {
      state.error = action.payloadload
      state.loading = false
    },

    DeleteUserStart: (state) => {
      state.loading = true
    },

    DeleteUserSuccess: (state, action) => {
      state.currentuser = null
      state.loading = false
      state.error = null
    },
    DeleteUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    SignOutUserStart: (state) => {
      state.loading = true
    },

    SignOutUserSuccess: (state, action) => {
      state.currentuser = null
      state.loading = false
      state.error = null
    },

    SignOutUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export let {
  sign_in_start,
  sign_in_success,
  sign_in_failure,
  UpdateUserStart,
  UpdateUserSuccess,
  UpdateUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure,
  SignOutUserStart,
  SignOutUserSuccess,
  SignOutUserFailure
  
} = User_Slice.actions
export default User_Slice.reducer
