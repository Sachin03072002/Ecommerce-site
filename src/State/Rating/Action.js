import { api } from "../../config/apiConfig";
import { GET_ALL_RATINGS_REVIEWS_FAILURE, GET_ALL_RATINGS_REVIEWS_REQUEST, GET_ALL_RATINGS_REVIEWS_SUCCESS, SUBMIT_REVIEW_FAILURE, SUBMIT_REVIEW_REQUEST, SUBMIT_REVIEW_SUCCESS } from "./ActionType";

export const createRating = (productId, value, reviewText) => async (dispatch) => {

    try {
        dispatch({ type: SUBMIT_REVIEW_REQUEST });
        const requestData = {
            product: productId,
            rating: value,
            review: reviewText,
        };

        const { data } = await api.post(`/api/ratings/create`, requestData);


        dispatch({
            type: SUBMIT_REVIEW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: SUBMIT_REVIEW_FAILURE, payload: error.message });
    }
};

export const getAllRatingsReviews = (productId) => async (dispatch) => {
    dispatch({ type: GET_ALL_RATINGS_REVIEWS_REQUEST });

    try {
        const { data } = await api.get(`/api/ratings/product/${productId.toString()}`);


        dispatch({
            type: GET_ALL_RATINGS_REVIEWS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({ type: GET_ALL_RATINGS_REVIEWS_FAILURE, payload: error.message });
    }
};
