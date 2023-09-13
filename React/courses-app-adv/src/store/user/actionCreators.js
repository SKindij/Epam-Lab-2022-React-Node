// actionCreators.js
import {
	ADD_USER,	UPDATE_USER,
	REMOVE_USER,	GET_USER_ROLE,
} from './actionTypes';

export const addUser = (payload) => ({
	type: ADD_USER,
	payload,
});

export const getUserRole = (payload) => ({
	type: GET_USER_ROLE,
	payload,
});

export const updateUser = (payload) => ({
	type: UPDATE_USER,
	payload,
});

export const removeUser = (payload) => ({
	type: REMOVE_USER,
	payload,
});
