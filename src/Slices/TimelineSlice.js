
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

export const get_post_replies = createAsyncThunk(
    "get_post_replies",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI,location.POST_ALL_REPLIES, data?.query,data?.token);
    }
  );
  
  export const get_search_timeline = createAsyncThunk(
    "get_search_timeline",
    async (data, thunkAPI) => {
      return await doGet(thunkAPI,location.POST_SEARCH_TIMELINE, data?.query,data?.token);
    }
  );

  export const post_comment_reply = createAsyncThunk(
    "post_comment_reply",
    async (data, thunkAPI) => {
      return await doPost(thunkAPI,location.POST_CREATE_REPLY, {},data?.body,data?.token);
    }
  );
  
  
  
