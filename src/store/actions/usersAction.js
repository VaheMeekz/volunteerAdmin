import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_USERS } from "../types";

export const getCountriesThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/project`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
};
