import { Route } from '@profiscience/knockout-contrib-router'
import articles from './articles'
import favorites from './favorites'

export default new Route('/profile/:username', {
  component: () => ({
    template: import('./template.html'),
    viewModel: import('./viewModel')
  }),
  children: [
    articles,
    favorites
  ]
})