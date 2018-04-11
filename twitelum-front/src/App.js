import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        // this.setState(event.target.value)
        this.setState({novoTweet: event.target.value})
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

        this.setState({
            tweets: [novoTweet, ...tweetsVelhos]
        })
        
    }

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
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
                                {this.state.tweets.map((tweet, index) => {
                                    return <Tweet key={tweet + index} texto={tweet}/>
                                })}
                                
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default App;
