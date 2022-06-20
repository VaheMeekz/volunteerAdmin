import axios from "axios";
import {baseUrl} from "../../config/config";
import {GET_FILES} from "../types";

export const getFileAC = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/upload`);
        dispatch({
            type: GET_FILES,
            payload: response.data,
        });
    };
};
