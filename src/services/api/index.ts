import axios, { AxiosPromise, AxiosRequestConfig, AxiosError } from 'axios';
import { API_URL } from 'react-native-dotenv';
import auth from '@react-native-firebase/auth';
import type { RegisterUser } from './types';

const handleError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('Request', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  return { status: 0, ...error };
};

// our "constructor"
const create = (baseURL = API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an axios-based api object.
  //
  const api = axios.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // 15 second timeout...
    timeout: 15000,
  });

  api.interceptors.request.use(async function (config: AxiosRequestConfig) {
    const user = auth().currentUser;
    const token = await user?.getIdToken();
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add a response interceptor
  api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, handleError);

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const registerUser = (data: RegisterUser): AxiosPromise =>
    api.post('/users', data);

  const registerBloodPressureRecord = (data: RegisterUser): AxiosPromise =>
    api.post('/blood-pressure/', data);

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    registerUser,
    registerBloodPressureRecord,
  };
};

// let's return back our create method as the default.
export default create;
