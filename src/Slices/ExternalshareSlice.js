import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  CreateRes : {}
};

export const externalshareslice = createAsyncThunk(
  "getlinkshare",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.EXTERNAL_SHARE, data?.query, data?.body);
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
      .addCase(externalshareslice.pending, (state) => {
        state.pending = true;
      })
      .addCase(externalshareslice.fulfilled, (state, action) => {
        state.pending = false;
        state.CreateRes = action.payload;
      })
      .addCase(externalshareslice.rejected, (state) => {
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
