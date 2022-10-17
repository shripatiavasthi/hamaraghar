import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  CreateRes : {}
};

export const bookmarksave = createAsyncThunk(
  "getbookmark",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.BOOKMARK_SAVE, data?.query, data?.body , data?.token );
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
      .addCase(bookmarksave.pending, (state) => {
        state.pending = true;
      })
      .addCase(bookmarksave.fulfilled, (state, action) => {
        state.pending = false;
        state.CreateRes = action.payload;
      })
      .addCase(bookmarksave.rejected, (state) => {
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
