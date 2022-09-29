import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  CreateRes : {}
};

export const getCategories = createAsyncThunk(
  "getOtplogin",
  async (data, thunkAPI) => {
    return await doGet(thunkAPI,location.GET_CATEGORIES, {},data?.token);
  }
);

export const getSubCategories = createAsyncThunk(
  "getSubCategories",
  async (data, thunkAPI) => {
    return await doGet(thunkAPI,location.GET_SUB_CATEGORIES, data?.query,data?.token);
  }
);

const belongSlice = createSlice({
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
      .addCase(getCategories.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.pending = false;
        state.CreateRes = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setAddressStateSlider,
} = belongSlice.actions;
export default belongSlice.reducer;