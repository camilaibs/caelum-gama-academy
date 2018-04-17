import {createStore} from 'redux'

function tweetsReducer( estadoInicial= [], acao ) {
    
    if (acao.type === 'CARREGA_TWEETS') {
        const novoEstado = acao.tweets
        return novoEstado
    }

    return estadoInicial
}

const store = createStore(tweetsReducer)

export default store