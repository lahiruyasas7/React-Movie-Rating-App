export const actionTypes = {
    GET_ALL_MOVIES: 'GET_ALL_MOVIES',
    GET_MOVIES_SUCCESS: 'GET_MOVIES_SUCCESS',
    GET_MOVIES_FAIL: 'GET_MOVIES_FAIL',
    LOGIN_LISTEN: 'LOGIN_LISTEN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_LOADER_HANDLE: 'LOGIN_LOADER_HANDLE',
    IS_LOGIN_ERROR: 'IS_LOGIN_ERROR',
}

export function getAllMovies () {
    return { type: actionTypes.GET_ALL_MOVIES};
}

export const loginListen = (data: any, history: any) => {
	return {
		type: actionTypes.LOGIN_LISTEN,
		data,
		history,
	};
};

export const loginSuccess = (data: any) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		data,
	};
};

export const handleLoginLoader = (data: any) => {
	return {
		type: actionTypes.LOGIN_LOADER_HANDLE,
		data,
	};
};