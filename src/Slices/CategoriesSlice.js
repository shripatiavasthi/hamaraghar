import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {}
};

export const categories = createAsyncThunk(
  "getOtplogin",
  async (data, thunkAPI) => {
    return await doPost(location.VERIFY_OTP_PHONE, data?.query, data?.body);
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
      .addCase(categories.pending, (state) => {
        state.pending = true;
      })
      .addCase(categories.fulfilled, (state, action) => {
        state.pending = false;
        state.otpResp = action.payload;
      })
      .addCase(categories.rejected, (state) => {
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
