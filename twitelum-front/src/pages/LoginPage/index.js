import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {
    constructor() {
        super()
        this.state = {
            error: ''
        }
    }

    fazLogin = event => {
        event.preventDefault()
        const login = this.inputLogin.value
        const senha = this.inputSenha.value

        const infoUsuario = {
            login,
            senha
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(infoUsuario)
        })
        .then((resposta) => {
            if (!resposta.ok) {
                throw resposta
            }
            return resposta.json()
        })
        .then((respostaPronta) => {
            console.log(respostaPronta.token)
            localStorage.setItem('TOKEN', respostaPronta.token)
            localStorage.setItem('LOGIN', this.inputLogin.value)
            this.props.history.push('/')
        })
        .catch((erro) => {
            erro.json().then((response) => {
                // console.log(response)
                this.setState({
                    error: "Login ou senha inválidos"
                })
            })
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.fazLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label>
                                <input 
                                    className="loginPage__input"
                                    type="text" 
                                    id="login" 
                                    name="login"
                                    ref={ (inputLoginDoDOM) => this.inputLogin = inputLoginDoDOM } />
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label>
                                <input 
                                className="loginPage__input" 
                                type="password" 
                                id="senha" 
                                name="senha"
                                ref={ (inputSenhaDoDOM) => this.inputSenha = inputSenhaDoDOM } />
                            </div>

                            {this.state.error &&
                                <div className="loginPage__errorBox">
                                    {this.state.error}
                                </div> 
                            }

                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage