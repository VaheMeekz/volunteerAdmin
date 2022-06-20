import {GET_EVENTS, GET_USERS} from "../types"

const initialState = {
    users: null,
    evetss: null
}


export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case GET_EVENTS:
            return {
                ...state,
                eventss: action.payload
            }
        default:
            return state
    }
}