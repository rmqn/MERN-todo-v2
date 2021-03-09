import React, { useEffect, useState, useContext } from 'react'
import { UidContext } from '../AppContext';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Card, Container, Tooltip, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodo } from '../../actions/todo.actions';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(() => ({
  root: {
    cardCustom: {
      background: "linear-gradient(101.18deg, rgba(255, 255, 255, 0.36) 19.31%, rgba(255, 255, 255, 0.27) 90.35%)",
      backdropFilter: "blur(50px)",
      borderRadius: "15px",
      position: "relative",
      padding: ".5em",
      marginBottom: "1.5rem"
    }
  },
}));

export default function FormTask() {
  const classes = useStyles();

  const initialStateTodos = { id: uuidv4(), item: '', done: false };
  const [inputFields, setInputFields] = useState([initialStateTodos]);
  const [list, setList] = useState('')

  const uid = useContext(UidContext);
  const dispatch = useDispatch();



  const onSubmitTodo = async (e) => {
    e.preventDefault()

    if (list && inputFields) {
      const data = {
        userId: uid,
        list: list,
        todos: inputFields
      }
      await dispatch(addTodo(data))
      dispatch(getTodo())
      setInputFields([initialStateTodos])
      setList('')
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
    setInputFields([...inputFields, initialStateTodos])
  }


  return (
    <Box >
      <Container >
        <Card  >
          <form onSubmit={onSubmitTodo} noValidate autoComplete="off" className={classes.cardCustom} mb="2">
            <Container>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" p="2">Donner un nom à votre liste</Typography>

                <FormControl mb={5}>
                  <Input id="component-simple" name="list" value={list} onChange={(e) => setList(e.target.value)} />
                </FormControl>

                <Typography p="2">Ajouter des éléments à votre liste</Typography>
                {inputFields.map((inputField) => {
                  return (
                    <Box key={inputField.id}>
                      <TextField
                        name="item"
                        label="item"
                        value={inputField.item}
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />
                      <Tooltip title="Ajouter une tâche">
                        <AddCircleIcon onClick={handleAddFields}/>
                      </Tooltip>
                    </Box>

                  )
                })}


              </Box>
            </Container>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Envoyer
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );

}