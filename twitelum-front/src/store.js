import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'


function tweetsReducer( estado = { lista: [], tweetAtivo: {} }, acao ) {
    
    if (acao.type === 'CARREGA_TWEETS') {
        const novoEstado = {
            ...estado,
            lista: acao.tweets
        }
        return novoEstado
    }

    if (acao.type === 'ADD_TWEET') {
        const novoEstado = {
            ...estado,
            lista: [acao.novoTweet, ...estado.lista]
        }

        return novoEstado
    }

    if (acao.type === 'REMOVE_TWEET') {
        // console.warn('acao', acao)
        const listaTweets = estado.lista.filter(tweetAtual => {
            return tweetAtual._id !== acao.idTweet
        })
        const novoEstado = {
            ...estado,
            lista: listaTweets
        }
        
        return novoEstado
    }

    if (acao.type === 'ADD_TWEET_ATIVO') {

        const tweetAtivo = estado.lista.find((tweetAtual) => {

            return tweetAtual._id === acao.idTweetModal
        })

        const novoEstado = {
            ...estado,
            tweetAtivo: tweetAtivo
        }

        return novoEstado
    }

    if (acao.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...estado,
            tweetAtivo: {}
        }
    }

    if (acao.type === 'LIKE') {

        const tweetsAtualizados = estado.lista.map( (tweetAtual) => {

            if (tweetAtual._id === acao.idTweet) {

                const { likeado, totalLikes } = tweetAtual

                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1
            }

            return tweetAtual
        })
        

        return {
            ...estado,
            lista: tweetsAtualizados
        }
    }

    return estado
}

function notificacaoReducer( estado= '', acao = {} ) {

    if (acao.type === 'ADD_NOTIFICACAO') {

        const novoEstado = acao.msg
        return novoEstado
    }

    if (acao.type === 'REMOVE_NOTIFICACAO') {
        return ''
    }

    return estado
}

const store = createStore(
    combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacaoReducer
    }),
    applyMiddleware(thunk)
)

export default store