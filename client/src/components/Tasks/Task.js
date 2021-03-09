import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from '../../actions/todo.actions';
import CardTask from './CardTask';
import { isEmpty } from '../Utils';
import { UidContext } from '../AppContext';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container } from '@material-ui/core';

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

function Task() {
  const classes = useStyles()

  const [loadPost, setLoadPost] = useState(true);
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  const uid = useContext(UidContext);

  useEffect(() => {
    if (loadPost) {
      dispatch(getTodo())
      setLoadPost(false)
    }

  }, [loadPost, todos, dispatch])

  const checkUserId = () => {
    for(let i = 0; i < todos.length; i++) {
      let userID = todos[i].userId;
      if(userID === uid) return true
    }
  }
  

  return (
    <div>

      {!isEmpty(todos) && checkUserId() ? (
        todos.map((todo, index) => {
          if(uid === todo.userId) {
            return <CardTask todo={todo} key={index} />
          }
        })) : (
            <Card className={classes.cardCustom}>
              <Typography align="center" variant="h5" p="2">Aucune Tâche encore créer</Typography>
            </Card>
          )}

    </div>
  )
}

export default Task
