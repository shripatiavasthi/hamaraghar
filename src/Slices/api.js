import links from "../helpers/links";
import ObjectHelper from "../helpers/objectHelpers";
import NetInfo from "@react-native-community/netinfo";
import { resetScreen, Screens } from "../helpers/Screens";

const getLocation = (location) => {
  return links?.baseApi + location;
};


async function status(response) {

  if (response.status >= 200 && response.status < 300) {
    // alert('Working fine ')
  }
  if (response.status >= 401 && response.status <= 403) {
    alert(`Token expired please login again\nError code : ${response?.status}`)
    resetScreen(Screens?.Login)
  }
  if (response.status == 400 || (response.status >= 404 && response.status < 500)) {
    alert(`Something went wrong, please try again later\nError code : ${response?.status} `)
  }
  if (response.status >= 500) {
    alert(`Server error, we are working on it please wait for sometime\nError code : ${response?.status} `)
  }
}

export const doPost = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  const NetInfoData = await NetInfo.fetch()
  // thunk.dispatch(SpinnerActions.showSpinner())

  if (!NetInfoData?.isInternetReachable || !NetInfoData?.isConnected) {
    alert("Please Check your internet connection")
    // thunk.dispatch(SpinnerActions.hideSpinner())
  }
  const response = await fetch(url, config);
  // thunk.dispatch(SpinnerActions.hideSpinner())
  status(response)
  console.log(response, url, body,".............")
  return await response.json();
};

export const doPut = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }

  const NetInfoData = await NetInfo.fetch()
  // thunk.dispatch(SpinnerActions.showSpinner())

  if (!NetInfoData?.isInternetReachable || !NetInfoData?.isConnected) {
    alert("Please Check your internet connection")
    // thunk.dispatch(SpinnerActions.hideSpinner())
  }

  const response = await fetch(url, config);
  thunk.dispatch(SpinnerActions.hideSpinner())
  console.log(url, response,body, "..................")
  status(response)
  return await response.json();
};


export const doDel = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  // thunk.dispatch(SpinnerActions.showSpinner())
  const response = await fetch(url, config);
  // thunk.dispatch(SpinnerActions.hideSpinner())
  console.log(response, url, body,".............")
  status(response)
  return await response.json();
};

export const doGet = async (thunk, location, query, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  console.log(url, query, token)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  // thunk.dispatch(SpinnerActions.showSpinner())
  const response = await fetch(url, config);
  // thunk.dispatch(SpinnerActions.hideSpinner())
  status(response)
  console.log(response, url,token, ".............")
  return await response.json();
};
