import axios from "axios";
import { baseUrl, token } from "../../config/config";
import {GET_ORDERS} from "../types"

export const getOrdersThunk = () => {
    return async (dispatch) => {
      const response = await axios.get(`${baseUrl}/homeWeDo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_ORDERS,
        payload: response.data,
      });
    };
  };