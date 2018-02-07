import { App } from '@profiscience/knockout-contrib-framework/runtime'
import { Router } from '@profiscience/knockout-contrib-router'

const app = new App({
  hashbang: true,
  activePathCSSClass: 'active',
  base: PRODUCTION
    ? '/knockout-realworld' // gh-pages
    : ''                    // development
})

app.start({
  isNavigating: Router.isNavigating
})