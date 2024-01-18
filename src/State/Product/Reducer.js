import { DELETE_PRODUCTS_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "./ActionType"

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
}
export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null }

        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload }
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload }
        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state, loading: false, error: null,
                deletedproduct: action.payload
            }
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}