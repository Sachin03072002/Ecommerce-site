import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
} from "./ActionType";

const initialState = {
    loading: false,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
        case UPDATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        // Add more cases for other actions if needed

        default:
            return state;
    }
};

export default paymentReducer;
