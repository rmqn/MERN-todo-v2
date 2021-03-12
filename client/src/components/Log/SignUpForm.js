import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm';
import { Box, Button, Checkbox, Input } from '@material-ui/core';

function SignUpForm() {

  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.querySelector('#terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error');

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas"

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales d'utilisation"
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password
        }
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <Box p={2}>
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <Input
              type="text"
              name="pseudo"
              id="pseudo"
              fullWidth
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
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
            <label htmlFor="password-conf">Confirmer Mot de passe</label>
            <br />
            <Input
              type="password"
              name="password"
              id="password-conf"
              fullWidth
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <Checkbox type="checkbox" id="terms" color="primary"/>
            <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
            <div className="terms error"></div>
            <br />
            <Box display="flex" justifyContent="center" mt={5}>
              <Button type="submit" variant="contained" color="primary">S'inscrire</Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  )
}

export default SignUpForm
