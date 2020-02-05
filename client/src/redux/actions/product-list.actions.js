import {
	FETCH_DATA,
	DELETE_PHONE,
	CLOSE_MODAL,
	SEARCH_PHONE_TEXT,
	SEARCHED_PHONE
} from '../constants/product-list.constants';

export const fetchProductData = (data) => {
	console.log('Action called');
	return {
		type: FETCH_DATA,
		payload: data
	};
};

export const deletePhoneRecordCall = (data) => {
	return {
		type: DELETE_PHONE,
		payload: data
	};
};

export const closeModal = () => {
	return {
		type: CLOSE_MODAL
	};
};

export const setSearchField = (data) => {
	return {
		type: SEARCH_PHONE_TEXT,
		payload: data
	};
};

export const getSearchedPhone = (data) => {
	return {
		type: SEARCHED_PHONE,
		payload: data
	};
};
