import { GET_USERS } from "../types"

const initialState = {
    users:null,
}


export const usersReducer = (state=initialState,action) => {
    switch (action.type){
        case GET_USERS:
            return {
                ...state,
                users:action.payload,
            }
        default:
            return state
    }
}