import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from './Reducers/index'
import thunk from "redux-thunk"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(){
  return createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  )
}

export const store = configureStore()
