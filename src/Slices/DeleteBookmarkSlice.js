import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  CreateRes : {}
};

export const bookmarkdelete = createAsyncThunk(
  "deletebookmark",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI, location.BOOKMARK_DELETE, data?.query, data?.body , data?.token );
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
      .addCase(bookmarkdelete.pending, (state) => {
        state.pending = true;
      })
      .addCase(bookmarkdelete.fulfilled, (state, action) => {
        state.pending = false;
        state.CreateRes = action.payload;
      })
      .addCase(bookmarkdelete.rejected, (state) => {
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
