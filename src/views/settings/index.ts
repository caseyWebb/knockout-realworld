import { Route } from '@profiscience/knockout-contrib-router'

export default new Route('/settings', {
  component: () => ({
    template: import('./template.html'),
    viewModel: import('./viewModel')
  })
})