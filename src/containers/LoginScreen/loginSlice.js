import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "../../Slices/api";
import location from "../../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {},
  token : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGlhcyI6IlNodWJoYW0xMjM0IiwiaWF0IjoxNjY2MDMyMDMwLCJleHAiOjE2NjYxMTg0MzB9.11dzQqP27_dem2_3xsjEiniqmgIqVc-yKWP3w9kYunM'
};

export const postUserLogin = createAsyncThunk(
  "postUserLoginNew",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI,location.USERLOGIN, data?.query, data?.body);
  }
);


const loginSlice = createSlice({
  name: "StoreAddress",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    },
    setAddressStateSlider(state, action) {
     
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postUserLogin.pending, (state) => {
        state.pending = true;
      })
      .addCase(postUserLogin.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload.result;
        state.otpResp = action.payload
        console.log( action.payload)
      })
      .addCase(postUserLogin.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setAddressStateSlider,
} = loginSlice.actions;
export default loginSlice.reducer;
