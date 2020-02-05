import {
	FETCH_DATA,
	DELETE_PHONE,
	CLOSE_MODAL,
	SEARCH_PHONE_TEXT,
	SEARCHED_PHONE
} from '../constants/product-list.constants';

const initialState = {
	data: [],
	prodName: '',
	deleteID: '',
	searchField: '',
	modal: false
};

function phoneListReducer(state = initialState, action) {
	console.log('REDUCER CALLED', JSON.stringify(action.payload));
	switch (action.type) {
		case FETCH_DATA:
			return { ...state, data: action.payload };
		case DELETE_PHONE:
			return {
				...state,
				prodName: action.payload.prodName,
				deleteID: action.payload.deleteID,
				modal: !state.modal
			};
		case CLOSE_MODAL:
			return { ...state, modal: !state.modal };
		case SEARCH_PHONE_TEXT:
			return { ...state, searchField: action.payload };
		case SEARCHED_PHONE:
			return { ...state, data: action.payload };
		default:
			return state;
	}
}

export default phoneListReducer;
