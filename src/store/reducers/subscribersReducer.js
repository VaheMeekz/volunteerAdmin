import { GET_SUBSCRIBERS } from "../types";

const initialState = {
  subscribers: null,
};

export const subscribersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.payload,
      };
    default:
      return state;
  }
};
