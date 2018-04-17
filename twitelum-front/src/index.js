import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'
// import './index.css';

import Roteamento from './routes'

import { Provider } from 'react-redux'
import Store from './store'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Roteamento />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
