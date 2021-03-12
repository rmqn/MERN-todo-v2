import React, { useEffect, useState, useContext } from 'react'
import { UidContext } from '../AppContext';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodo } from '../../actions/todo.actions';
import { v4 as uuidv4 } from 'uuid';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Card, Container, Fab, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';import { capitalizeFirstLetter, isEmpty } from '../Utils';


const useStyles = makeStyles(() => ({
  spacing: 4,
  cardCustom2: {
    background: "linear-gradient(101.18deg, rgba(255, 255, 255, 0.36) 19.31%, rgba(255, 255, 255, 0.27) 90.35%)",
    borderRadius: "15px",
    position: "relative",
    padding: ".5em",
    marginBottom: "1.5rem",
  },
  btn: {
    position: 'absolute',
    top: '50px',
    left: '30px'
  },
}));

export default function FormTask() {
  const classes = useStyles();

  const initialStateTodos = { id: uuidv4(), item: '', done: false };
  const [inputFields, setInputFields] = useState([initialStateTodos]);
  const [list, setList] = useState('')
  const [formIsOpen, setFormIsOpen] = useState(false)


  const uid = useContext(UidContext);
  const dispatch = useDispatch();


  const onSubmitTodo = async (e) => {
    e.preventDefault()

    if (list && inputFields[0].item) {
      const data = {
        userId: uid,
        list: list,
        todos: inputFields
      }
      await dispatch(addTodo(data))
      await dispatch(getTodo())
      setInputFields([initialStateTodos])
      setList('')
      setFormIsOpen(false)
    } else {
      console.log('error champs non remplis');

    }
  }



  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), item: '', done: false }])
  }

  const handleRemoveFields = (id) => {
    const updatedField = [...inputFields];
    const newInputFields = updatedField.findIndex(index => index.id === id);
    updatedField.splice(newInputFields, 1);
    setInputFields(updatedField);
  }


  const resetInputField = () => {
    setFormIsOpen(!formIsOpen)
    setList('')
    setInputFields([initialStateTodos])
  }



  return (
    <>
      {/* BUTTON */}
      {!formIsOpen ? (
        <Tooltip title="Ajouter une liste" aria-label="Ajouter une liste" className={classes.btn}>
          <Fab color="primary" onClick={() => setFormIsOpen(!formIsOpen)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title="Fermer l'ajout de liste" aria-label="Fermer l'ajout de liste" className={classes.btn}>
          <Fab color="primary" id='closeBtn' onClick={resetInputField}>
            <CloseIcon />
          </Fab>
        </Tooltip>
      )}
      {/* FORM */}
      {formIsOpen ? (
        <Box >
          <Container className="card-appear">
            <Card className={classes.cardCustom2}>
              <form onSubmit={onSubmitTodo} noValidate autoComplete="off">
                <Container width={1}>
                  <Box display="flex" flexDirection="column" m={2} >
                    <Typography variant="h6" >Donner un nom à votre liste :</Typography>
                    <Box mb={5} width={1}>
                      <TextField fullWidth id="component-simple" name="list" value={list} onChange={(e) => setList(e.target.value)} />
                    </Box>
                    <Box mb={2}>
                      <Typography variant="subtitle2">Ajouter des éléments à votre liste :</Typography>
                    </Box>
                    {/* elem add */}
                    {inputFields.map((inputField) => {
                      return (
                        <>
                          <Box key={inputField.id} display="flex" alignItems="flex-end" pb={2} >
                            <TextField
                              name="item"
                              fullWidth
                              value={inputField.item}
                              onChange={event => handleChangeInput(inputField.id, event)}
                            />
                            <Box position="absolute" right="0px" >
                              <Tooltip title="Ajouter un élément">
                                <IconButton onClick={handleAddFields} > 
                                  <AddCircleIcon/> 
                                </IconButton>
                              </Tooltip>
                            </Box>
                            <Box position="absolute" right="30px" >
                              <Tooltip title="Ajouter un élément">
                                <IconButton onClick={(event) => handleRemoveFields(inputField.id, event)} > 
                                  <RemoveCircleIcon/> 
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </>
                      )
                    })}
                    <Box display="flex" justifyContent="flex-end" mt={5}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >Ajouter
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </form>
            </Card>
          </Container>
        </Box>
      ) : (
        null
      )}
    </>
  );

}