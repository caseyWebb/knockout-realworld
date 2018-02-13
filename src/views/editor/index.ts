import { Route } from '@profiscience/knockout-contrib-router'

import _new from './new'
import edit from './edit'

export default new Route('/editor', {
  children: [
    _new,
    edit
  ]
})