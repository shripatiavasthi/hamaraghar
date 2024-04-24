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

export const changePassword = createAsyncThunk(
  "changePasswordNew",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI,location.CHANGE_PASSWORD, data?.query, data?.body, data?.formData , data?.token);
  }
);

const changepasswordSlice = createSlice({
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
      .addCase(changePassword.pending, (state) => {
        state.pending = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload.token;
      })
      .addCase(changePassword.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = changepasswordSlice.actions;
export default changepasswordSlice.reducer;
