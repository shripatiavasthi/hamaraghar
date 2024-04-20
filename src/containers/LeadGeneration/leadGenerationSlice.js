import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "../../Slices/api";
import location from "../../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  leadData : []
};

export const getAllLead = createAsyncThunk(
  "getAllLead",
  async (data, thunkAPI) => {
    return await doGet(thunkAPI,location.GET_LEAD_ALL, data?.query, data?.token);
  }
);

const leadSlice = createSlice({
  name: "LeadSlice",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllLead.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllLead.fulfilled, (state, action) => {
        state.leadData = action.payload
        state.pending = false;
      })
      .addCase(getAllLead.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = leadSlice.actions;
export default leadSlice.reducer;
