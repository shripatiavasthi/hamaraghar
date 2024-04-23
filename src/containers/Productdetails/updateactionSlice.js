import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut , doPatch } from "../../Slices/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import location from "../../helpers/locations";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {},
  token : null
};

export const Userupdate = createAsyncThunk(
  "updateuser",
  async (data, thunkAPI) => {
    return await doPatch(thunkAPI,location.USER_UPDATE_API, data?.query, data?.body, data?.token);
  }
);

const userUpdateSlice = createSlice({
  name: "StoreAddress",
  initialState,
  reducers: {
    rehydrate(state, action) { 

    },
    setAddressStateSlider(state, action) {
     
    },
    // setToken(state,action){
    //   state.token = action.payload;
    // }
  },

  extraReducers: (builder) => {
    builder
      .addCase(Userupdate.pending, (state) => {
        state.pending = true;
      })
      .addCase(Userupdate.fulfilled, (state, action) => {
        state.pending = false;
      //  state.token = action.payload.token;
      })
      .addCase(Userupdate.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});



export const {
  rehydrate,
  setToken
} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
