import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {}
};

export const verify_otp_email = createAsyncThunk(
  "getOtplogin",
  async (data, thunkAPI) => {
    return await doPost(location.VERIFY_OTP_EMAIL, data?.query, data?.body);
  }
);



const addressSlice = createSlice({
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
      .addCase(verify_otp_email.pending, (state) => {
        state.pending = true;
      })
      .addCase(verify_otp_email.fulfilled, (state, action) => {
        state.pending = false;
        state.otpResp = action.payload;
      })
      .addCase(verify_otp_email.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});


export const {
  rehydrate,
  setAddressStateSlider,
} = addressSlice.actions;
export default addressSlice.reducer;
