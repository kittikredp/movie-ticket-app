export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SET_ACTIVE_MOVIE = 'SET_ACTIVE_MOVIE';
export const CLEAR_ACTIVE_MOVIE = 'RECEIVED_MOVIES';

export function fetchMovies() {
  return {
    type: FETCH_MOVIES
  }
}

export function fetchMoviesSuccess(movies) {
  return {
		type: FETCH_MOVIES_SUCCESS,
		payload: movies
  }
}

export const fetchMoviesFailure = (message) => ({
    type: FETCH_MOVIES_FAILURE,
    payload: message
})

export function setActiveMovie(activeMovie) {
  return {
    type: SET_ACTIVE_MOVIE,
    activeMovie: activeMovie
  }
}

export function clearActiveMovie() {
  return {
    type: CLEAR_ACTIVE_MOVIE
  }
}