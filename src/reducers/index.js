import { combineReducers } from "redux"
import MovieReducer from "./reducer_movie"

const rootReducer = combineReducers({
  movie: MovieReducer
})

export default rootReducer
