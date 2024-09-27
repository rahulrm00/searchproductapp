import { createAction } from '@reduxjs/toolkit';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const fetchCategoriesRequest = createAction(FETCH_CATEGORIES_REQUEST);
export const fetchCategoriesSuccess = createAction(FETCH_CATEGORIES_SUCCESS);
export const fetchCategoriesFailure = createAction(FETCH_CATEGORIES_FAILURE);
export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesRequest());
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            dispatch(fetchCategoriesSuccess(data));
        } catch (error) {
            dispatch(fetchCategoriesFailure(error.message));
        }
    };
};
