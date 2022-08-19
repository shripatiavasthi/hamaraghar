import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doPost, doGet, doDel,doPut } from "./api";
import location from "../helpers/locations";
import links from "../helpers/links";

const initialState = {
  pending: false,
  loading: false,
  error: false,
  openselectpatientandAddress: false,
  openAddAddress: false,
  openaddpatientdetail: false,
  editaddpatientdetails: false,
  cartandbooking: false,
  profileAddress: false,
  familyMember: false,
  singlepatientdetai: {},
  bookingDoneSuccess: {},
  selectedUsers: [],
  mapMyIndiaToken: {},
  CityObj: {},
  openSelectAddressModal: false,
  openAddressModal: true,
  openEditAddresModal: false,
  openSelectPatientDetailsModal: false,
  openAddPatientDetailsModal: false,
  openEditPatientModal: false,
  UserAddress: [],
  EditUserAddressDetails : {},
  PatientDetailList : [],
  EditUserPatientDetails:{}
};
export const doBooking = createAsyncThunk(
  "doBooking",
  async (data, thunkAPI) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${data?.token}`,
      },
      body: JSON.stringify(data?.body),
    };
    const response = await fetch(
      `${links?.baseApi}/booking/customer/create/`,
      config
    );
    return await response.json();
  }
);

// export const getMapMyIndiaAccessToken = createAsyncThunk(
//   "getMapMyIndiaAccessToken",
//   async (token, thunkAPI) => {
//     doPost()
//     const config = {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     };
//     const response = await fetch(
//       `${PrefixApi}panel/mapmyindia-auth-token/`,
//       config
//     );
//     return await response.json();
//   }
// );

export const getMapMyIndiaAccessToken = createAsyncThunk(
  "getMapMyIndiaAccessToken",
  async (data, thunkAPI) => {
    return doGet(location.ACCESS_TOKEN_MAPMYINDIA, {}, data?.token);
  }
);

export const getAllUserAddress = createAsyncThunk(
  "getAllUserAddress",
  async (data, thunkAPI) => {
    return doGet(location.ADDRESS, {}, data?.token);
  }
);

export const updateAddress = createAsyncThunk(
  "updateAddress",
  async (data, thunkAPI) => {
    newUrl = `${location.ADDRESS}${data?.id}/`
    // console.log(newUrl,data,"lloooll")
    return doPut(newUrl,{},data?.body,data?.token);
  }
);


export const updateUserFamMem = createAsyncThunk(
  "updateUserFamMem",
  async (data, thunkAPI) => {
    newUrl = `${location.EDIT_FAMILY_MEMBER}${data?.id}/`
    return doPut(newUrl,{},data?.body,data?.token);
  }
);

export const getAllUserPaitent = createAsyncThunk(
  "getAllUserpatient",
  async (data, thunkAPI) => {
    return doGet(location.FAMILYMEMBER, {}, data?.token);
  }
);

export const postFamilyMember = createAsyncThunk(
  "addfamilyMember",
  async (data, thunkAPI) => {
    return doPost(location.ADDMEMBER,data?.query,data?.body, data?.token)
  }
);

export const postAddress = createAsyncThunk(
  "addAddres",
  async (data, thunkAPI) => {
    return doPost(location.ADDRESS,data?.query,data?.body, data?.token)
  }
);

export const checkvalidAddress = createAsyncThunk(
  "getMapMyIndiaAccessToken",
  async (data, thunkAPI) => {
    return doGet(location.CHECK_VALID_ADDESS, data?.query);
  }
);

// booking/checking-geofence-area-mapmyindia_2/?eloc=UB3A97

export const getAutoSuggestion = createAsyncThunk(
  "getMapMyIndiaAccessToken",
  async (data, thunkAPI) => {
    let url = `https://atlas.mapmyindia.com/api/places/search/json?query=${data?.value}&access_token=${data?.token}&tokenizeAddress=true`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, config);
    // console.log(response,">>>>>>>>>");
    return await response.json();
  }
);



const addressSlice = createSlice({
  name: "StoreAddress",
  initialState,
  reducers: {
    rehydrate(state, action) { },
    setAddressStateSlider(state, action) {
      state.openselectpatientandAddress = action.payload;
    },
    setpatientdetailSlider(state, action) {
      state.openaddpatientdetail = action.payload;
    },
    seteditpatientdetailSlider(state, action) {
      state.editaddpatientdetails = action.payload;
    },
    setsinglepatient(state, action) {
      state.singlepatientdetai = action.payload;
    },
    sethandleprofileaddress(state, action) {
      state.profileAddress = action.payload;
    },
    setfamilyMember(state, action) {
      state.familyMember = action.payload;
    },
    setopenAddress(state, action) {
      state.openAddAddress = action.payload;
    },
    setcartandbooking(state, action) {
      state.cartandbooking = action.payload;
    },
    setselectedUsers(state, action) {
      state.selectedUsers = action.payload;
    },
    setCityCurrentObj(state, action) {
      state.CityObj = action.payload;
    },
    setStateAddressModal(state, action) {
      state.openAddressModal = action.payload;
    },
    setStateSelectAddressModal(state, action) {
      state.openSelectAddressModal = action.payload;
    },
    setStateEditAddressModal(state, action) {
      state.openEditAddresModal = action.payload;
    },
    setEditAddressDetailsInModal(state, action) {
      state.EditUserAddressDetails = action.payload;
    },
    setEditPatientDetailsInModal(state, action) {
      state.EditUserPatientDetails = action.payload;
    },
    setSelectPatientDetailsModal(state, action) {
      state.openSelectPatientDetailsModal = action.payload;
    },
    setAddPatientDetailsModal(state, action) {
      state.openAddPatientDetailsModal = action.payload;
    },
    setStateEditPatientModal(state, action) {
      state.openEditPatientModal = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(doBooking.pending, (state) => {
        state.pending = true;
      })
      .addCase(doBooking.fulfilled, (state, action) => {
        state.pending = false;
        state.bookingDoneSuccess = action.payload;
      })
      .addCase(getMapMyIndiaAccessToken.fulfilled, (state, action) => {
        state.mapMyIndiaToken = action.payload;
      })
      .addCase(getAllUserAddress.fulfilled, (state, action) => {
        state.UserAddress = action.payload?.results;
      })
      .addCase(getAllUserPaitent.fulfilled, (state, action) => {
        state.PatientDetailList = action.payload;
      })
      .addCase(doBooking.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const {
  rehydrate,
  setAddressStateSlider,
  setpatientdetailSlider,
  seteditpatientdetailSlider,
  setsinglepatient,
  setopenAddress,
  setcartandbooking,
  setselectedUsers,
  setCityCurrentObj,
  sethandleprofileaddress,
  setfamilyMember,
  setStateAddressModal,
  setStateEditAddressModal,
  setStateSelectAddressModal,
  setEditAddressDetailsInModal,
  setSelectPatientDetailsModal,
  setAddPatientDetailsModal,
  setStateEditPatientModal,
  setEditPatientDetailsInModal

} = addressSlice.actions;
export default addressSlice.reducer;
