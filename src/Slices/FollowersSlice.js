import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {}
};

export const followers = createAsyncThunk(
  "getOtplogin",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.FOLLOWERS, data?.query, data?.body,data?.token);
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
      .addCase(followers.pending, (state) => {
        state.pending = true;
      })
      .addCase(followers.fulfilled, (state, action) => {
        state.pending = false;
        state.otpResp = action.payload;
      })
      .addCase(followers.rejected, (state) => {
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
