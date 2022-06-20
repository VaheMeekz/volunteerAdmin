import {GET_FILES} from "../types";

const initialState = {
    file: null,
    loading: true
};

export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILES:
            return {
                ...state,
                file: action.payload,
                loading: false
            }
        default:
            return state;
    }
};
