import { Router } from '@profiscience/knockout-contrib-router'

import article from './article'
import auth from './auth'
import editor from './editor'
import home from './home'
import profile from './profile'
import settings from './settings'

Router.useRoutes([
  article,
  auth,
  editor,
  home,
  profile,
  settings
])