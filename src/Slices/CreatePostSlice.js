import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {}
};

export const createpostslice = createAsyncThunk(
  "createpostslice",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.CREATEPOST, data?.query, data?.body , data?.token);
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
      .addCase(createpostslice.pending, (state) => {
        state.pending = true;
      })
      .addCase(createpostslice.fulfilled, (state, action) => {
        state.pending = false;
        state.otpResp = action.payload;
      })
      .addCase(createpostslice.rejected, (state) => {
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
