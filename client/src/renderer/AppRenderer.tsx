import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import './App.scss'
import RootReducer from './reducers'
import DialogForm from './containers/DialogForm'

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(ReduxThunkMiddleware))

  render(
    <Provider store={store}>
      <>
        <DialogForm />
      </>
    </Provider>,
    document.querySelector('.app')
  )
})
