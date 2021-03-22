import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateTodoStatus, updateTodo, getTodo } from '../../actions/todo.actions';
import { capitalizeFirstLetter } from '../Utils';
//MUI
import { Box, Checkbox, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  taskDone: {
    textDecoration: "line-through",
    color: "#484848"
  },
}));

export default function ElementTask({ elem, todo }) {
  const classes = useStyles()

  const [checked, setChecked] = useState(elem.done);
  const [item, setItem] = useState(elem.item);
  const [editTodo, setEditTodo] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null);


  const dispatch = useDispatch();


  const updateStatus = () => {
    setChecked(!checked);
    dispatch(updateTodoStatus(todo, elem._id, !checked));
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateTodo(todo, elem._id, textUpdate))
    setEditTodo(false)
    setItem(textUpdate)
  }


  return (
    <Box display="flex" alignItems="center">
      <Checkbox
        color="primary"
        checked={checked}
        onClick={updateStatus}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      {editTodo ? (
        <form action="" onSubmit={handleSubmit}>
          <input 
          type="text"
          defaultValue={item}
          onChange={(e) => setTextUpdate(e.target.value)}
           />
        </form>
      ) : (
        <Typography variant="h6" className={checked ? classes.taskDone : null} onClick={() => setEditTodo(!editTodo)}>
          {capitalizeFirstLetter(item)}
        </Typography>
      )}
    </Box>
  )
}