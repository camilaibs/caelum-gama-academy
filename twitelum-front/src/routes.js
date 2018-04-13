import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'


const Roteamento = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={() => <div>Página 404</div>} />
        </Switch>
    )
}

export default Roteamento