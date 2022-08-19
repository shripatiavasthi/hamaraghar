import links from "../helpers/links";
import ObjectHelper from "../helpers/objectHelpers";

const getLocation = (location) => {
  return links?.baseApi + location;
};

function status(response) {
  if (response.status === 204) {
    return Promise.resolve(null);
  }
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject({
      statusText: response.statusText,
      status: response.status,
      responseJson: response.data,
    });
  }
}

export const doPost = async (location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  const response = await fetch(url, config);
  // console.log(response,url,".............")
  return await response.json();
};

export const doPut = async (location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  const response = await fetch(url, config);
  console.log(response,url,".............")
  return await response.json();
};


export const doDel = async (location, query, body, token) => {
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
  const response = await fetch(url, config);
  // console.log(response,url,".............")
  return await response.json();
};

export const doGet = async (location, query, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  const response = await fetch(url, config);
  // status(response.json());
  // console.log(response,url,".............")
  return await response.json();
};
