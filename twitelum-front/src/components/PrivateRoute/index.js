import React from 'react'
import { Route, Redirect} from 'react-router-dom'


function estaAtenticado() {
    if (localStorage.getItem('TOKEN')) {
        return true
    }
    return false
}

export default class PrivateRoute extends React.Component {

    render() {
        const Component = this.props.component

        if (estaAtenticado()) {
            return (
                // <Route path={path} component={component} {...this.props}/>
                // <Route {...this.props}/>
                <Route render={ () => <Component {...this.props} /> } />
            )
        } else {
            return (
                <Redirect to='/login' />
            )
        }
    }
}
