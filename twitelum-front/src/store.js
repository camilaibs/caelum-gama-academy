import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'


function tweetsReducer( estado = { lista: [], tweetAtivo: {}}, acao ) {
    
    if (acao.type === 'CARREGA_TWEETS') {
        const novoEstado = acao.tweets
        return novoEstado
    }

    if (acao.type === 'ADD_TWEET') {
        const novoEstado = [acao.novoTweet, ...estado] 
        return novoEstado
    }

    if (acao.type === 'REMOVE_TWEET') {
        console.warn('acao', acao)
        const novoEstado = estado.filter(tweetAtual => {
            // console.warn('tweetAtual', tweetAtual)
            return tweetAtual._id !== acao.idTweet
        })
        
        return novoEstado
    }

    return estado
}

const store = createStore(
    tweetsReducer,
    applyMiddleware(thunk)
)

export default store