
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel ,doPut } from "./api";
import location from "../helpers/locations";


const initialState = {
  pending: false,
  loading: false,
  error: false,
  CreateRes : {}
};

export const get_curated_timeline = createAsyncThunk(
    "get_curated_timeline",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI,location.GET_CURATED_TIMELINE, {},data?.token);
    }
  );
  