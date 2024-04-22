import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "../../Slices/api";
import location from "../../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  leadData : []
};

export const getfilterlist = createAsyncThunk(
  "getfilterlist",
  async (data, thunkAPI) => {
    return await doGet(thunkAPI,location.GET_FILTER_API, data?.query, data?.token);
  }
);

const getfilterSlice = createSlice({
  name: "getfilterSlice",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getfilterlist.pending, (state) => {
        state.pending = true;
      })
      .addCase(getfilterlist.fulfilled, (state, action) => {
        state.leadData = action.payload
        state.pending = false;
      })
      .addCase(getfilterlist.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = getfilterSlice.actions;
export default getfilterSlice.reducer;
