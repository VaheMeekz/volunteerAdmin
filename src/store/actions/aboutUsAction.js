import axios from "axios";
import { baseUrl } from "../../config/config";
import { GET_ABOUT_US, GET_ABOUT_US_INFO } from "../types";

export const getAboutUsThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/aboutUs/up`);
    dispatch({
      type: GET_ABOUT_US,
      payload: response.data[0],
    });
  };
};

export const getAboutUsInfoThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/aboutUs/down`);
    dispatch({
      type: GET_ABOUT_US_INFO,
      payload: response.data,
    });
  };
};
