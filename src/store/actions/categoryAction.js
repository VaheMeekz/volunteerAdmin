import axios from "axios";
import {baseUrl} from "../../config/config";
import {GET_CATEGORY} from "../types";

export const getCategoryThunk = (offset, limit, search) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/work`, {
            params: {
                offset,
                limit,
                search
            },
        });
        dispatch({
            type: GET_CATEGORY,
            payload: response.data,
        });
    };
};
