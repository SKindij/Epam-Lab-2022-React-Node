// reducer.js
import {
	ADD_USER,	UPDATE_USER,
	REMOVE_USER,	GET_USER_ROLE,
} from './actionTypes';

const user = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (state = user, action) => {
	switch (action.type) {
		case GET_USER_ROLE:
			return {
				...state,
				role: action.payload.result.role,
			};
		case ADD_USER:
			return {
				...state,
				...action.payload,
			};
		case UPDATE_USER:
			return {
				...state,
				name: action.payload.user.name,
				token: action.payload.result,
				isAuth: action.payload.result ? true : false,
			};
		case REMOVE_USER:
			return {
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};
		default:
			return state;
	}
};
