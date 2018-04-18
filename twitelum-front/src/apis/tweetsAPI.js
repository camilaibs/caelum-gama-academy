
export const carregaTweet = () => {
    return (dispatch) => {
    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then((resposta) => resposta.json())
        .then((tweetsExistentes) => {

            dispatch({
                type: 'CARREGA_TWEETS',
                tweets: tweetsExistentes
            })

        })
    }
}

export const addTweet = (novoTweet) => {
    return (dispatch) => {
        if (novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
                .then((resposta) => {
                    return resposta.json()
                })
                .then((tweetServer) => {
                    dispatch({ 
                        type: 'ADD_TWEET',
                        novoTweet: tweetServer
                    })
                    
                })
        }
    }
}

export const removeTweet = (idTweet) => {
    return(dispatch) => {
        fetch(`http://localhost:3001/tweets/${idTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
            .then(respostaServer => respostaServer.json())
            .then(respostaPronta => {
                dispatch({
                    type:'REMOVE_TWEET',
                    idTweet: idTweet
                })
                // const tweetsAtualizados = this.state.tweets.filter(tweetAtual => {
                //     return tweetAtual._id !== idTweet
                // })

                // this.setState({
                //     tweets: tweetsAtualizados,
                //     tweetAtivo: {}
                // })
            })
    }
}

