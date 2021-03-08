import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import Log from '../components/Log/Log';
import Home from './Home';
function Login() {

  const uid = useContext(UidContext);

  console.log(uid);

  return (
    <div>
      {uid ? <Home/> : <Log signin={true} signup={false} />}
     
    </div>
  )
}

export default Login
