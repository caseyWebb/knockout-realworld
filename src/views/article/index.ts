import { Route } from '@profiscience/knockout-contrib-router'

export default new Route('/article/:slug', {
  component: () => ({
    template: import('./template.html'),
    viewModel: import('./viewModel')
  })
})