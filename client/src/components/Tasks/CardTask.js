import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container } from '@material-ui/core';
// import ElementTask from './ElementTask'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';


const useStyles = makeStyles(() => ({
  cancelIconCustom: {
    position: "absolute",
    top: 0,
    margin: ".5em",
    right: 0,
  },
  cardCustom: {
    background: "linear-gradient(101.18deg, rgba(255, 255, 255, 0.36) 19.31%, rgba(255, 255, 255, 0.27) 90.35%)",
    backdropFilter: "blur(50px)",
    borderRadius: "15px",
    position: "relative",
    padding: ".5em",
    marginBottom: "1.5rem"
  }
}));

function CardTask({ todo, index }) {

  const classes = useStyles()

  const todos = useSelector((state) => state.todoReducer);
  const todosId = todo.userId;

  const uid = useContext(UidContext);


  return (
    
    <>

     <Box>
      <Container>
          <Card className={classes.cardCustom}>
            <Typography align="center" variant="h5" p="2">{todo.list}</Typography>
            <Tooltip title="Supprimer">
              <IconButton className={classes.cancelIconCustom} aria-label="Supprimer">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Container>
              <Box>
                {/* {task.data.map((elem) => {
                            return <ElementTask elem={elem}/>
                          })} */}
              </Box>
            </Container>
          </Card>
      </Container>
    </Box>

     
    </>


  )
}

export default CardTask
