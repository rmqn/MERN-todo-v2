import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../../pages/Login'
import Home from '../../pages/Home'


function index() {
    return (

        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </Router>

    )
}

export default index
