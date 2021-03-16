import React, { useEffect, useState, useContext } from 'react'
import ElementTask from './ElementTask'
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter, dateParser } from '../Utils';
import { deleteTodo, getTodo } from '../../actions/todo.actions';
import Modale from '../Modale/Modale';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles(() => ({
  cancelIconCustom: {
    position: "absolute",
    top: 0,
    margin: ".5em",
    right: 0,
  },
  cardCustom: {
    background: "linear-gradient(101.18deg, rgba(255, 255, 255, 0.36) 19.31%, rgba(255, 255, 255, 0.27) 90.35%)",
    // backdropFilter: "blur(50px)",
    borderRadius: "15px",
    position: "relative",
    padding: ".5em",
    marginBottom: "1.5rem",
    paddingBottom: '3em'
  }
}));

function CardTask({ todo }) {
  const classes = useStyles()

  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch();

  const deleteQuote = () => {   
    dispatch(deleteTodo(todo._id));
    dispatch(getTodo())
    setOpenModal(false)
  }

  const stopPropa = (e) => {
    e.stopPropagation();
  }
  
  return (

    <>
      <Box className="card-appear">
        <Container>
          <Card className={classes.cardCustom}>
            <Box  p={2}>
              <Typography align="center" variant="h5">{capitalizeFirstLetter(todo.list)}</Typography>
            </Box>
            <Tooltip title="Supprimer">
              <IconButton 
                className={classes.cancelIconCustom} 
                aria-label="Supprimer" 
                onClick={() => {setOpenModal(!openModal)}}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {openModal && 
            <Modale 
              message="Etes vous sûr de vouloir supprimer ?"
              setOpenModal={setOpenModal}
              deleteQuote={deleteQuote}
              stopPropa={stopPropa}
            />}
            <Container>
              <Box>
                {todo.todos.map((elem) => <ElementTask elem={elem} todo={todo._id} key={elem._id} />)}
              </Box>
            </Container>
          </Card>
        </Container>
      <Box mt={-2} mb={2}>
        <Container>
          <Typography style={{color: "#FFFFFF"}}>Créer le {dateParser(todo.createdAt)}</Typography>
        </Container>
      </Box>
      </Box>
    </>
  )
}

export default CardTask
