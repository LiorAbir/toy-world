import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { toyReducer } from './reducers/toyReducer'
import { useReducer } from 'react'

const rootReducer = combineReducers({
	toyModule: toyReducer,
	userModule: useReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
