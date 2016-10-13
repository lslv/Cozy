import React from 'react'
import ReactDom from 'react-dom'
import App from './components/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxPromise from 'redux-promise'
import reducers from './reducers'
import createLogger from 'redux-logger'

//Sass
require('../../Styles/main.scss')

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDom.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('app'))
