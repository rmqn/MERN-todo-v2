import { DELETE_TODO, GET_TODO, GET_ALL_TODO, UPDATE_TODO, ADD_TODO } from "../actions/todo.actions";

const initialState = {};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODO:
      return action.payload;
    case ADD_TODO:
      return action.payload;
    case UPDATE_TODO:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            done: action.payload.done
          }
        } else return post;
      });
      case DELETE_TODO:
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return state.filter((post) => post._id !== action.payload.postId);
          } else return post;
        });
    default:
      return state;
  }
}