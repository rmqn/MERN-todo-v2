import { DELETE_TODO, GET_TODO, GET_ALL_TODO, UPDATE_TODO } from "../actions/todo.actions";

const initialState = {};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODO:
      return action.payload;
    case UPDATE_TODO:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message
          }
        } else return post;
      });
    case DELETE_TODO:
      return state.filter((post) => post._id !== action.payload.postId), console.log(action.payload.postId);
    default:
      return state;

  }
}