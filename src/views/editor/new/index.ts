import { Route } from '@profiscience/knockout-contrib-router'

export default new Route('/', {
  component: () => ({
    template: import('./template.html')
  })
})