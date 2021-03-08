import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import errorReducer from './error.reducer'
import todoReducer from './todo.reducer'

export default combineReducers({
    userReducer,
    todoReducer,
    errorReducer,
})