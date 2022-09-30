import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {}
};

export const belong_Details = createAsyncThunk(
  "getOtplogin",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.BELONG_DETAILS, data?.query, data?.body);
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
      .addCase(belong_Details.pending, (state) => {
        state.pending = true;
      })
      .addCase(belong_Details.fulfilled, (state, action) => {
        state.pending = false;
        state.otpResp = action.payload;
      })
      .addCase(belong_Details.rejected, (state) => {
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
