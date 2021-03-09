import React, { useState } from 'react'
import { Box, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    taskDone: {
        textDecoration: "line-through",
        color: "#484848"
    },
}));

export default function ElementTask({elem}) {

    const classes = useStyles()

    const [checked, setChecked] = useState(elem.done);

    const handleChange = () => {
        setChecked(!checked);
    };



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