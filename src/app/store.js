import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import LoginSlice from '../slices/LoginSlice';

const reducers = combineReducers({
    LoginSlice
});

const persistConfig = {
    key: 'root',
    storage : AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk]
});

export default store;