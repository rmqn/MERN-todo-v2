import axios from "axios";

// posts
export const GET_TODO = "GET_TODO";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

/**
 * 
 * @posts
 */
 export const getTodo = () => {
  return (dispatch) => {
      return axios
          .get(`${process.env.REACT_APP_API_URL}api/todos/`)
          .then((res) => {
              const array = res.data
              dispatch({ type: GET_TODO, payload: array })
             
          })
          .catch((err) => console.log(err))
  }
}

export const addTodo = (data) => {
  return (dispatch) => {
      return axios
          .post(`${process.env.REACT_APP_API_URL}api/todos/`, data)
          .then((res) => {
              if (res.data.errors) {
                  dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
              } else {
                  dispatch({ type: ADD_TODO, payload: res.data });
              }
          });
  };
};


export const updateTodo = (postId, todoId, done) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/todos/edit-todo-post/${postId}`,
      data: { todoId, done },
    })
      .then((res) => {
        dispatch({ type: UPDATE_TODO, payload: { postId, todoId, done } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTodo = (postId) => {
  return (dispatch) => {
      return axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}api/todos/${postId}`
      })
          .then((res) => {
              dispatch({ type: DELETE_TODO, payload: { postId } })
          })
          .catch((err) => console.log(err))
  }
}