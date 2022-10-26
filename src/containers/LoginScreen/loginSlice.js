import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "../../Slices/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import location from "../../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  otpResp : {},
  token : ''
};

export const postUserLogin = createAsyncThunk(
  "postUserLoginNew",
  async (data, thunkAPI) => {
    return await doPost(thunkAPI,location.USERLOGIN, data?.query, data?.body);
  }
);

export const storeToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('token', jsonValue)
  } catch (e) {
    // saving error
  }
}

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
        state.token = action.payload.result;
        state.otpResp = action.payload
        storeToken(action.payload.result)
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
