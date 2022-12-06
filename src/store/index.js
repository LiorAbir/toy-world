import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { toyReducer } from './reducers/toyReducer'

const rootReducer = combineReducers({
	toyModule: toyReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
