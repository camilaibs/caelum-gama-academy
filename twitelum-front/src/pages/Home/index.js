import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {
                usuario: {}
            },
            error: '',
            login: '',
            token: localStorage.getItem('TOKEN'),
            login: localStorage.getItem('LOGIN')
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        // fetch('http://localhost:3001/tweets')
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${this.state.token}`)
            .then((resposta) => resposta.json())
            .then((tweetsExistentes) => {

                this.setState({
                    tweets: tweetsExistentes,
                    // login: localStorage.getItem('LOGIN')
                })
            })

        // fetch(`http://localhost:3001/usuarios/omariosouto`)
        //     .then((resposta) => resposta.json())
        //     .then((usuarios) => {

        //         this.setState({
        //             // login: localStorage.getItem('LOGIN')
        //         })
        //     })
    }

    handleChange(event) {
        // this.setState(event.target.value)
        this.setState({ novoTweet: event.target.value })
    }

    handleButton() {
        if (this.state.novoTweet.length > 140) {
            return true
        } else {
            return false
        }
    }

    handleSubmit(event) {
        event.preventDefault()

        const novoTweet = this.state.novoTweet
        const tweetsVelhos = this.state.tweets


        if (novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${this.state.token}`, {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw resposta
                    }
                    return resposta.json()
                })
                .then((tweetServer) => {
                    // console.log(tweetServer)
                    this.setState({
                        tweets: [tweetServer, ...tweetsVelhos]
                    })
                })
                .catch((erro) => {
                    erro.json().then((response) => {
                        // console.log(response)
                        this.setState({
                            error: "Não encontrou tweets"
                        })
                    })
                })
        }

    }

    removeTweet = (idTweet) => {

        fetch(`http://localhost:3001/tweets/${idTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
            .then(respostaServer => respostaServer.json())
            .then(respostaPronta => {
                const tweetsAtualizados = this.state.tweets.filter(tweetAtual => {
                    return tweetAtual._id !== idTweet
                })

                this.setState({
                    tweets: tweetsAtualizados
                })
            })

    }

    abreModal = (idTweetModal) => {

        const tweetAtivo = this.state.tweets.find((tweetAtual) => {
            return tweetAtual._id === idTweetModal
        })

        this.setState({
            tweetAtivo: tweetAtivo
        })
    }


    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario={`@ ${this.state.login}`} />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.handleSubmit}>
                                <div className="novoTweet__editorArea">
                                    <span
                                        className={`novoTweet__status ${
                                            this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido' : ''
                                            }`}>
                                        {this.state.novoTweet.length}/140
                                    </span>
                                    <textarea
                                        className="novoTweet__editor"
                                        value={this.state.novoTweet}
                                        onChange={this.handleChange}
                                        placeholder="O que está acontecendo?">
                                    </textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="novoTweet__envia"
                                    disabled={this.handleButton()}>
                                    Tweetar
                                </button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">

                                {/* { this.state.tweets === '' && 
                                    <div> Escreva um Tweet ! </div>
                                } */}
                                {this.state.tweets.length === 0 ?
                                    <div> Escreva um Tweet ! </div> : ''
                                }

                                {this.state.tweets.length && this.state.tweets.map((tweet, index) => {
                                    return <Tweet
                                        key={tweet._id}
                                        removeHandler={() => this.removeTweet(tweet._id)}
                                        handleModal={() => this.abreModal(tweet._id)}
                                        texto={tweet.conteudo}
                                        tweetInfo={tweet} />
                                })}

                                {this.state.error &&
                                    <div className="loginPage__errorBox">
                                        {this.state.error}
                                    </div>
                                }

                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                {this.state.tweetAtivo._id &&
                    <Tweet
                        removeHandler={() => this.removeTweet(this.state.tweetAtivo._id)}
                        texto={this.state.tweetAtivo.conteudo}
                        tweetInfo={this.state.tweetAtivo} />
                }

            </Fragment>
        );
    }
}

export default Home;
