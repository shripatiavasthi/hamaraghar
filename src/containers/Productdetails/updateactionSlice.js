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

export const postUserLogin = createAsyncThunk(
  "postUserLoginNew",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI,location.USER_UPDATE_API, data?.query, data?.body, data?.formData);
  }
);

const loginSlice = createSlice({
  name: "StoreAddress",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    },
    setAddressStateSlider(state, action) {
     
    },
    setToken(state,action){
      state.token = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(postUserLogin.pending, (state) => {
        state.pending = true;
      })
      .addCase(postUserLogin.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload.token;
      })
      .addCase(postUserLogin.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = loginSlice.actions;
export default loginSlice.reducer;
