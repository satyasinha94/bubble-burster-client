import {combineReducers} from 'redux'
import authReducer from './auth'
import artistReducer from './artist'
import genreReducer from './genre'
import trackReducer from './track'
import recommendationReducer from './recs'
import playBackReducer from './player'

const rootReducer = combineReducers({
  auth: authReducer,
  artists: artistReducer,
  genres: genreReducer,
  tracks: trackReducer,
  recs: recommendationReducer,
  playBack: playBackReducer
})
 export default rootReducer
