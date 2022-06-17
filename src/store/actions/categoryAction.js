import axios from "axios";
import {baseUrl} from "../../config/config";
import {GET_CATEGORY} from "../types";

export const getCategoryThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/work`,
        );
        dispatch({
            type: GET_CATEGORY,
            payload: response.data,
        });
    };
};
