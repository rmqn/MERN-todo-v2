import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";
// MATERIEL UI
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

function Logout() {

  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))

    window.location = "/";
  }

  return (
    <Typography variant="body2" color="secondary">
      <Link href="#" onClick={logout}>Se déconnecter</Link>
    </Typography>
  )
}

export default Logout
