import React from 'react'
import ReactDOM from 'react-dom'
import { createStore , applyMiddleware , compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App'
import Reducers from './redux/redux'

import './css/index.css'
//BrowserRouter,
import {HashRouter} from 'react-router-dom'
const store = createStore(Reducers,compose(applyMiddleware(thunk)))
ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App aa={'wocao'}></App>

        </Provider>
    </HashRouter>,
    document.getElementById('root')
)
