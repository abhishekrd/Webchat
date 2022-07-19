import { userConstant } from "../actions/constants"

const initialState = {
    users: [],
    conversations: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case `${userConstant.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstant.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case userConstant.GET_REALTIME_MESSAGES:
            state = {
                ...state,
                messages: action.payload.messages
            }
            break;
    }

    return state;
}