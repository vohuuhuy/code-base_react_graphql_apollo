import {
  Login,
  TestForm
} from '../../pages'

export const DefaultComponent = TestForm

export const routers = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/testForm',
    component: TestForm
  }
]