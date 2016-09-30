import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import reducers from './reducers'
import createLogger from 'redux-logger'

const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore)

ReactDom.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('app'))
