import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "../../Slices/api";
import location from "../../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  leadData : []
};

export const getuserlist = createAsyncThunk(
  "getuserlist",
  async (data, thunkAPI) => {
    return await doGet(thunkAPI,location.GET_USER_LIST_API, data?.query, data?.token);
  }
);

const getuserSlice = createSlice({
  name: "getuserSlice",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getuserlist.pending, (state) => {
        state.pending = true;
      })
      .addCase(getuserlist.fulfilled, (state, action) => {
        state.leadData = action.payload
        state.pending = false;
      })
      .addCase(getuserlist.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = getuserSlice.actions;
export default getuserSlice.reducer;
