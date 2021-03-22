import React from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cancelIconCustom: {
    position: "absolute",
    top: 0,
    margin: ".5em",
    right: 0,
  },
  cardCustom: {
    position: "fixed",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "15px",
    padding: '3em',
    textAlign: 'center',
    width: '23em'
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '999'
  }
}));

function Modale({ message, setOpenModal, stopPropa, deleteQuote }) {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.overlay} onClick={() => setOpenModal(false)}>
        <Card className={classes.cardCustom} onClick={stopPropa}>
          <Typography style={{ marginBottom: '1em' }}>{message}</Typography>
          <Box>
            <Button 
              variant="contained" 
              style={{ marginRight: '1em' }}
              onClick={() => setOpenModal(false)}
            >Non</Button>
            <Button 
              variant="contained"
              color="primary"
              onClick={() => deleteQuote()}
            >Oui</Button>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default Modale
