import React, { useState } from 'react'
import axios from 'axios';
import { Box, Button, Input } from '@material-ui/core';

function SignInForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      }
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Box p={2} >
    <form action="" onSubmit={handleLogin} id="sign-up-form" >
      <label htmlFor="email">Email</label>
      <br />
      <Input
        type="text"
        name="email"
        id="email"
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <Input
        type="password"
        name="password"
        id="password"
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <Box display="flex" justifyContent="center" mt={5}>
        <Button type="submit" variant="contained" color="primary">Se connecter</Button>
      </Box>
    </form>
    </Box>
  )
}

export default SignInForm
