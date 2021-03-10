import React from 'react';
import bg from '../../assets/img/background.webp'
// MUI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backdropFilter: "blur(50px)",
    position: 'fixed',
    width: '100%',
    height: '100vh',
    zIndex: '-1'
  },
}));


function Background() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={12} md={12} className={classes.image} />
    </Grid>
  )
}

export default Background
