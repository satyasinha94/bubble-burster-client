import {combineReducers} from 'redux'
import authReducer from './auth'
import artistReducer from './artist'
import genreReducer from './genre'
import trackReducer from './track'
import recommendationReducer from './recs'

const rootReducer = combineReducers({
  auth: authReducer,
  artists: artistReducer,
  genres: genreReducer,
  tracks: trackReducer,
  recs: recommendationReducer
})
 export default rootReducer
