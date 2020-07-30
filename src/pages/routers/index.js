import React, { useContext } from 'react'
import { routersWithoutAuthen, routersAuthen } from '../../configs'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LayoutAuthen, LayoutWithoutAuthen } from '../../components'
import { ContextApp } from 'tools'

const Components = {}
routersWithoutAuthen.forEach(router => {
  Components[router.component] = React.lazy(() => import(`../${router.component}`))
})

routersAuthen.forEach(router => {
  Components[router.component] = React.lazy(() => import(`../${router.component}`))
})

const Routers = () => {
  const { isAuthen } = useContext(ContextApp)
  if (isAuthen) {
    return (
      <LayoutWithoutAuthen>
        <React.Suspense fallback={null}>
          <Switch>
            {routersAuthen.map(router => (
              <Route
                key={router.component}
                exact={router.exact}
                path={router.path}
                render={() => {
                  const Component = Components[router.component]
                  return (
                    <Component />
                  )
                }}
              />
            ))}
            <Redirect to={routersAuthen[0].path} />
          </Switch>
        </React.Suspense>
      </LayoutWithoutAuthen>
    )
  }
  return (
    <LayoutAuthen>
      <React.Suspense fallback={null}>
        <Switch>
          {routersWithoutAuthen.map(router => (
            <Route
              key={router.component}
              exact={router.exact}
              path={router.path}
              render={() => {
                const Component = Components[router.component]
                return (
                  <Component />
                )
              }}
            />
          ))}
          <Redirect to={routersWithoutAuthen[0].path} />
        </Switch>
      </React.Suspense>
    </LayoutAuthen>
  )
}

export default Routers