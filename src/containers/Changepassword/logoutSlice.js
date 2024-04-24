import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "../../Slices/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import location from "../../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {},
  token : null
};

export const logout = createAsyncThunk(
  "logout",
  async () => {
    return await doPost();
  }
);

const logoutSlice = createSlice({
  name: "StoreAddress",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    },
    setAddressStateSlider(state, action) {
     
    },
    setToken(state,action){
      state.token = ""
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.pending = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload.token;
      })
      .addCase(logout.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = logoutSlice.actions;
export default logoutSlice.reducer;
