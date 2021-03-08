import React, { useContext } from 'react'
import User from '../components/User/User'
import { UidContext } from '../components/AppContext'
import Task from '../components/Tasks/Task';


function Home() {

  const uid = useContext(UidContext);

  return (
    <div>
      <User/>
      <Task/>
    </div>
  )
}

export default Home
