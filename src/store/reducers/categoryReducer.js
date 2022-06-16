import { GET_CATEGORY } from "../types";

const initialState = {
  category: null,
  count:null
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload.news,
        count: action.payload.count,
      };
    default:
      return state;
  }
};
