import Login from '../pageMobile/login'
import Register from '../pageMobile/register'
// Graphql
const httpLinkUri = process.env.REACT_APP_HTTP_END_POINT
const wsLinkUri = process.env.REACT_APP_WS_END_POINT

const routerMobile = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

export { httpLinkUri, wsLinkUri, routerMobile }