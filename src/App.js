import React, { useRef, useReducer } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import 'antd/dist/antd.css';
import { Client } from './configs'
import { BrowserRouter } from 'react-router-dom'
import './common/css/index.css'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import Routers from './pages/routers'
import { ContextApp } from './tools'

function App() {
  const reducer = useRef((state, action) => {
    if (action.type) {
      switch (action.type) {
        default: return state
      }
    }
    return { ...state, ...action }
  })
  const initState = useRef({
    isAuthen: Boolean(localStorage.getItem('authorization')),
  })

  const [context, setContext] = useReducer(
    reducer.current,
    initState.current
  )

  const setAuthen = () => {
    if (Boolean(localStorage.getItem('authorization'))) setContext({ isAuthen: true })
    else setContext({ isAuthen: false })
  }

  const login = () => {
    localStorage.setItem('authorization', login.authorization)
    setAuthen()
  }

  const logout = () => {
    localStorage.removeItem('authorization')
    setAuthen()
  }

  return (
    <ApolloProvider client={Client}>
        <BrowserRouter>
          <div className='app'>
            <ContextApp.Provider value={{ ...context, setContext, setAuthen, login, logout }}>
              <Routers />
              <ReactNotification />
            </ContextApp.Provider>
          </div>
        </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
