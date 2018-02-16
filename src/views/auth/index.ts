import { Context, Route } from '@profiscience/knockout-contrib-router'
import { INITIALIZED } from '@profiscience/knockout-contrib-router-plugins'
import { currentUser } from 'src/models/user'

export default new Route('/', {
  async redirect() {
    await currentUser[INITIALIZED]
    if (currentUser.loggedIn()) {
      return '//'
    }
  },
  component: () => ({
    viewModel: import('./viewModel'),
    template: '<router></router>'
  }),
  children: [
    new Route('/login', { component: () => import('./login') }),
    new Route('/register', { component: () => import('./register') })
  ]
})