import { GET_ORDERS } from "../types";

const initialState = {
  orders: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ORDERS:
          return {
              ...state,
              orders:action.payload,
          }
    default:
      return state;
  }
};
