import { authConstant } from "../actions/constants"

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    authenticating: false,
    authenticated: false
}

export default (state = initialState, action) => {

    console.log(action);

    switch (action.type) {
        case `${authConstant.USER_LOGIN}_REQUEST`:
            state = {
                ...state,
                authenticating: true
            }
            break;

        case `${authConstant.USER_LOGIN}_SUCCESS`:
            state = {
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break;

        case `${authConstant.USER_LOGIN}_FAILURE`:
            state = {
                ...state,
                authenticating: false,
                authenticated: false,
                error: action.payload.error
            }
            break;


        case `${authConstant.USER_LOGOUT}_REQUEST`:
            break;
        case `${authConstant.USER_LOGOUT}_SUCCESS`:
            state = {
                ...initialState
            }
            break;
        case `${authConstant.USER_LOGOUT}_FAILURE`:
            state = {
                ...state,
                error: action.payload.error
            }
    }

    return state;
}