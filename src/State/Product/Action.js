import { API_BASE_URL, api } from "../../config/apiConfig";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "./ActionType";


export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST })
    const { colors, size, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize } = reqData;
    try {
        const { data } = await api.get(`${API_BASE_URL}/api/products?color=${colors}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        console.log("product data", data);
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
}



export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
    const { productId } = reqData;
    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        console.log("Id data:", data);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })
        const { data } = await api.post(`/api/admin/products`, product);
        console.log("created product", data);
        dispatch({
            type: CREATE_PRODUCT_SUCCESS, payload: data,
        })
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCTS_REQUEST })
        const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`);
        console.log("delete: ", data);
        dispatch({
            type: DELETE_PRODUCTS_SUCCESS, payload: productId,
        })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
    }
}
