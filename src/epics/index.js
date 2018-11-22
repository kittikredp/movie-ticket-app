import * as actions from '../actions'
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'

const ROOT_URL = 'https://salty-mountain-12765.herokuapp.com/movie'

function fetchMovies(action$) {
	return action$
		.ofType(actions.FETCH_MOVIES)
		.switchMap(() => {
				return ajax
					.getJSON(ROOT_URL)
					.map(data => actions.fetchMoviesSuccess(data))
		})
		.catch(error => Observable.of(actions.fetchMoviesFailure(error.message)))
}

export const rootEpic = combineEpics(
  fetchMovies
);