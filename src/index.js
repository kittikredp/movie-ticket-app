import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"
import { createEpicMiddleware } from 'redux-observable'
import 'rxjs'
import App from './containers/App'
import { rootEpic } from './epics'
import logger from 'redux-logger'
import reducers from "./reducers"
import './index.scss'

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  reducers,
  applyMiddleware(logger, epicMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)