import React, { useContext } from 'react'
import User from '../components/User/User'
import { UidContext } from '../components/AppContext'
import Task from '../components/Tasks/Task';
import FormTask from '../components/Tasks/FormTask';
import Background from '../components/Background/Background';


function Home() {

  const uid = useContext(UidContext);

  return (
    <div>
      <Background/>
      <User/>
      <FormTask/>
      <Task/>
    </div>
  )
}

export default Home
