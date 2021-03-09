import React, { useEffect, useState, useContext } from 'react'
import { UidContext } from '../AppContext';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodo } from '../../actions/todo.actions';
import { v4 as uuidv4 } from 'uuid';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Card, Container, IconButton, Tooltip, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';



const useStyles = makeStyles((theme) => ({
  spacing: 4,
  cardCustom2: {
    background: "linear-gradient(101.18deg, rgba(255, 255, 255, 0.36) 19.31%, rgba(255, 255, 255, 0.27) 90.35%)",
    backdropFilter: "blur(50px)",
    borderRadius: "15px",
    position: "relative",
    padding: ".5em",
    marginBottom: "1.5rem",
  }
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
    setInputFields([...inputFields, { id: uuidv4(), item: '', done: false }])
  }



  return (
    <Box >
      <Container>
        <Card className={classes.cardCustom2} >
          <form onSubmit={onSubmitTodo} noValidate autoComplete="off">
            <Container width={1}>
              <Box display="flex" flexDirection="column" m={2} >
                <Typography variant="h6" >Donner un nom à votre liste</Typography>

                <Box mb={5} width={1}>
                  <TextField fullWidth id="component-simple" name="list" value={list} onChange={(e) => setList(e.target.value)} />
                </Box>

                <Typography>Ajouter des éléments à votre liste</Typography>

                {/* elem add */}
                {inputFields.map((inputField) => {
                  return (
                    <Box key={inputField.id} display="flex" alignItems="flex-end" pb={2} >
                      <TextField
                        name="item"
                        fullWidth
                        value={inputField.item}
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />


                    </Box>
                  )
                })}
                <Box position="absolute" right="25px" top="120px">
                  <Tooltip title="Ajouter un élément">
                    <IconButton>
                      <AddCircleIcon onClick={handleAddFields} />
                    </IconButton>
                  </Tooltip>
                </Box>
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
  );

}