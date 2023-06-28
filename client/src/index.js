import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import App from './App';
import './index.css'
//redux-Store logic
const store=createStore(reducers, compose(applyMiddleware(thunk)))

//wrap <App/> componet with <Provider/>
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
