import {
	FETCH_MOVIES,
	FETCH_MOVIES_SUCCESS,
	FETCH_MOVIES_FAILURE,
	SET_ACTIVE_MOVIE,
	CLEAR_ACTIVE_MOVIE
} from "../actions"

const initState = {
	movieList: [],
	activeMovie: {},
	isLoading: false,
	error: null
}

export default function(state = initState, action) {
  switch (action.type) {
		case FETCH_MOVIES:
			return {
					...state,
					isLoading: true,
					error: null
			}
		case FETCH_MOVIES_SUCCESS:
			return {
				...state,
				movieList: action.payload,
				isLoading: false,
				error: null
			}
		case FETCH_MOVIES_FAILURE:
			return {
				...state,
				movieList: [],
				isLoading: false,
				error: action.payload
			}
		case SET_ACTIVE_MOVIE:
			return {
				...state,
				activeMovie: action.activeMovie
			}
		case CLEAR_ACTIVE_MOVIE:
			return {
				...state,
				activeMovie: {}
			}
  }
  return state
}
