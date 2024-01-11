export const actionTypes = {
    GET_ALL_MOVIES: 'GET_ALL_MOVIES',
    GET_MOVIES_SUCCESS: 'GET_MOVIES_SUCCESS',
    GET_MOVIES_FAIL: 'GET_MOVIES_FAIL',
}

export function getAllMovies () {
    return { type: actionTypes.GET_ALL_MOVIES};
}