import { GET_ALL_RATINGS_REVIEWS_FAILURE, GET_ALL_RATINGS_REVIEWS_REQUEST, GET_ALL_RATINGS_REVIEWS_SUCCESS, SUBMIT_REVIEW_FAILURE, SUBMIT_REVIEW_REQUEST, SUBMIT_REVIEW_SUCCESS } from "./ActionType";


const initialState = {
    order: null,
    loadingOrder: false,
    error: null,
    reviewSubmissionError: null,
    loadingReviewSubmission: false,
    ratingsReviews: [],
    loadingRatingsReviews: false,
    errorRatingsReviews: null,
};

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RATINGS_REVIEWS_REQUEST:
            return {
                ...state,
                loadingRatingsReviews: true,
            };
        case GET_ALL_RATINGS_REVIEWS_SUCCESS:
            return {
                ...state,
                ratingsReviews: action.payload,
                loadingRatingsReviews: false,
                errorRatingsReviews: null,
            };
        case GET_ALL_RATINGS_REVIEWS_FAILURE:
            return {
                ...state,
                loadingRatingsReviews: false,
                errorRatingsReviews: action.payload,
            };
        case SUBMIT_REVIEW_REQUEST:
            return {
                ...state,
                loadingReviewSubmission: true,
            };
        case SUBMIT_REVIEW_SUCCESS:
            return {
                ...state,
                reviewSubmissionError: null,
                loadingReviewSubmission: false,
            };
        case SUBMIT_REVIEW_FAILURE:
            return {
                ...state,
                reviewSubmissionError: action.payload,
                loadingReviewSubmission: false,
            };
        default:
            return state;
    }
};

export default ratingReducer;
