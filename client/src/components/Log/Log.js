import React, { useState } from 'react'
import Background from '../Background/Background';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
//MUI
import Link from '@material-ui/core/Link';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

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

function Log(props) {
  const classes = useStyles()

  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  }

  return (
    <>
      <Background />
      <Box style={{minHeight:"100vh"}} display="flex" justifyContent="center" alignItems="center">
        <Container className="login-container" maxWidth="xs" style={{margin:"1em"}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width={1} mb={3}>
          <Link href='#' onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</Link>
          <Link href='#' onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</Link>
        </Box>

        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
        </Container>
      </Box>
    </>
  )
}

export default Log
