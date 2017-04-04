import React from 'react';
import App from './App';

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import thunkMiddleware from 'redux-thunk'

//import createLogger from 'redux-logger'
//const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware//, // lets us dispatch() functions
    //loggerMiddleware // neat middleware that logs actions
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
