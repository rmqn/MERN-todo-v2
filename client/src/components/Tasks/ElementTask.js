import React, { useState } from 'react'
import { Box, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../../actions/todo.actions';

const useStyles = makeStyles(() => ({
    taskDone: {
        textDecoration: "line-through",
        color: "#484848"
    },
}));

export default function ElementTask({elem, todo}) {
    const classes = useStyles()

    const [checked, setChecked] = useState(elem.done);
    const [item, setItem] = useState('');

    const dispatch = useDispatch();




    const handleChange = () => {
        setChecked(!checked);
        dispatch(updateTodo(todo, elem._id, !checked));
        console.log('SEND');
        console.log(elem._id);
    };
    console.log(elem._id);
    console.log(todo);
    console.log(checked)

    return (
        <Box display="flex" alignItems="center">
            <Checkbox
                checked={checked}
                onClick={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography variant="h6" className={checked === true ? classes.taskDone : ''} onClick={handleChange}>
                {elem.item}
            </Typography> 
        </Box>
    )
}