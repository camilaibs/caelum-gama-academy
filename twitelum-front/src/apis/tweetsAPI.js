
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
                dispatch({
                    type:'REMOVE_TWEET_ATIVO'
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

export const like = (idTweet) => {
    return (dispatch) => {
        // tem q add o Fetch
        dispatch({
            type: 'LIKE',
            idTweet
        })
        dispatch({
            type: 'ADD_NOTIFICACAO',
            msg: 'Oeeeeeeeeeeeee ce deu likeeeeeeeeeeeeeeeeee'
        })
        /* setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICACAO'
            })
        } ,5000 ) */
        
    }
}
