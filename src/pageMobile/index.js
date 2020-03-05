import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routerMobile } from '../config'
import './index.css'

function PageMobile (props) {
  return (
    <Router>
      <div className='page'>
        <Switch>
          {routerMobile.map((route, i) =>
            <Route
              key={i}
              path={route.path}
              render={propsRoute => <route.component { ...props } { ...propsRoute } routes={route.routes} />}
            />
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default PageMobile