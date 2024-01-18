import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_ORDER_FAILURE,
    GET_ORDER_BY_ID_ORDER_REQUEST,
    GET_ORDER_BY_ID_ORDER_SUCCESS,
    GET_ORDERS_BY_USER_ID_FAILURE,
    GET_ORDERS_BY_USER_ID_REQUEST,
    GET_ORDERS_BY_USER_ID_SUCCESS,
} from "./ActionType";

const initialState = {
    order: null,
    loading: false,
    error: null,
    orders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_BY_ID_ORDER_REQUEST:
        case GET_ORDERS_BY_USER_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };

        case GET_ORDER_BY_ID_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };

        case GET_ORDERS_BY_USER_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case CREATE_ORDER_FAILURE:
        case GET_ORDER_BY_ID_ORDER_FAILURE:
        case GET_ORDERS_BY_USER_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default orderReducer;
