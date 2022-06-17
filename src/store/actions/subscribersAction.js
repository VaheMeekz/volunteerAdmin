import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_SUBSCRIBERS } from "../types";

export const getSubscribersThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/partner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    dispatch({
      type: GET_SUBSCRIBERS,
      payload: response.data,
    });
  };
};
