import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {}
};

export const followed = createAsyncThunk(
  "getOtplogin",
  
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.FOLLOWED, data?.query, data?.body,data?.token);
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
      .addCase(followed.pending, (state) => {
        state.pending = true;
      })
      .addCase(followed.fulfilled, (state, action) => {
        state.pending = false;
        state.otpResp = action.payload;
      })
      .addCase(followed.rejected, (state) => {
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
