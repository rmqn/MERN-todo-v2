import React, { useState } from 'react'
import Background from '../Background/Background';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
//MUI
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';


function Log(props) {

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
      <Box className="login-container">
        <Box display="flex" justifyContent="space-between" alignItems="center" width={1} mb={3}>
          <Link href='#' onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</Link>
          <Link href='#' onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</Link>
        </Box>

        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}

      </Box>
    </>
  )
}

export default Log
