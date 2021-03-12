import { GET_TODO_ERRORS } from "../actions/todo.actions";

const initialState = { userError: [], postError: [] };

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TODO_ERRORS:
            return {
                postError: action.payload,
                userError: []
            }
        default:
            return state;
    }
}