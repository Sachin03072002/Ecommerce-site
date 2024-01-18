import { api, API_BASE_URL } from "../../config/apiConfig";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    FIND_ORDERS_FAILURE,
    FIND_ORDERS_REQUEST,
    FIND_ORDERS_SUCCESS,
    GET_ORDER_BY_ID_ORDER_FAILURE,
    GET_ORDER_BY_ID_ORDER_REQUEST,
    GET_ORDER_BY_ID_ORDER_SUCCESS,
    GET_ORDERS_BY_USER_ID_FAILURE,
    GET_ORDERS_BY_USER_ID_REQUEST,
    GET_ORDERS_BY_USER_ID_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post('/api/orders', reqData.address);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        if (data._id) {
            console.log("dataid:", data._id);
            reqData.navigate({ search: `step=3&order_id=${data._id}` });
        }
    } catch (error) {
        console.error(error.message);
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_ORDER_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/${orderId}`);
        console.log("created order", data);
        dispatch({ type: GET_ORDER_BY_ID_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_ORDER_FAILURE, error: error.message });
    }
};

export const getOrdersByUserId = (userId) => async (dispatch) => {
    dispatch({ type: GET_ORDERS_BY_USER_ID_REQUEST });
    try {
        const { data } = await api.get(`${API_BASE_URL}/api/orders/user/${userId}`);
        console.log("orders by user", data);
        dispatch({ type: GET_ORDERS_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDERS_BY_USER_ID_FAILURE, error: error.message });
    }
};


export const findOrders = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_ORDERS_REQUEST });

    const { confirmed, shipped, delivered, placed } = reqData;

    try {
        // Construct the query string based on the provided parameters
        const queryString = new URLSearchParams({ confirmed, shipped, delivered, placed }).toString();

        // Make the API request using the constructed query string
        const { data } = await api.get(`${API_BASE_URL}/api/orders?${queryString}`);

        // Dispatch the success action with the received data
        dispatch({ type: FIND_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        // Dispatch the failure action with the error message
        console.error(error.message);
        dispatch({ type: FIND_ORDERS_FAILURE, payload: error.message });
    }
};

