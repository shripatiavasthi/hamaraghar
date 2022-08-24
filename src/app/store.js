import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import LoginSlice from '../Slices/LoginSlice';
import createUser from '../Slices/CreateUserSlice';
import send_otp_phone from '../Slices/SendPhoneOtpSlice'
import send_otp_email from '../Slices/SendEmailOtpSlice'


const reducers = combineReducers({
    LoginSlice,
    createUser,
    send_otp_phone,
    send_otp_email
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