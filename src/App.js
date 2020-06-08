import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Client } from './config'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routers, DefaultComponent } from './config'
import './common/css/index.css'

function App() {
  const childProps = {}
  return (
    <ApolloProvider client={Client}>
      <div className='page'>
        <BrowserRouter>
          <div className='page'>
            <Switch>
              {routers.map((route, i) =>
                <Route
                  key={i}
                  path={route.path}
                  render={propsRoute => <route.component { ...childProps } { ...propsRoute } routes={route.routes} />}
                />
              )}
              <Route path="/">
                <DefaultComponent />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  )
}

export default App
