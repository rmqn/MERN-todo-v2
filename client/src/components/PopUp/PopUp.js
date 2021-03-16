import React, { useState } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Container, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
  cardCustom: {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    borderRadius: "15px",
    padding: '2em',
    textAlign: 'center',
    zIndex: '999',
    color: "green"
  },
}));

function PopUp({ setOpenPopUp, message }) {
  const classes = useStyles()

  setTimeout(() => {
    setOpenPopUp(false)
  }, 5000)


  return (
    <>
      <Box className="pop-appear">
        <Container>
        <Card className={classes.cardCustom} >
          <Box display='flex' alignItems="center" >
            <CheckCircleIcon style={{marginRight:".2em"}}/>
            <Typography>{message}</Typography>
          </Box>
        </Card>
        </Container>
      </Box>
    </>
  )
}

export default PopUp
