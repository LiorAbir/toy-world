import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { toyReducer } from './reducers/toyReducer'
import { userReducer } from './reducers/userReducer'

const rootReducer = combineReducers({
	toyModule: toyReducer,
	userModule: userReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
