import { Route } from '@profiscience/knockout-contrib-router'

import _new from './new'

export default new Route('/editor', {
  children: [
    _new
  ]
})