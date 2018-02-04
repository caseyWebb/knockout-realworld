import * as ko from 'knockout'
import { LazyComponentLoader } from '@profiscience/knockout-contrib-components/loader'
import { Route, Router } from '@profiscience/knockout-contrib-router'
import {
  childrenPlugin,
  componentPlugin,
  initializerPlugin,
  redirectPlugin
} from '@profiscience/knockout-contrib-router-plugins'
import 'knockout-punches'

// makes debugging easier
(window as any).ko = ko;

// punches does not have types. sigh...
(ko as any).punches.enableAll()

ko.options.deferUpdates = true

Router
  .setConfig({
    hashbang: true,
    activePathCSSClass: 'active',
    base: PRODUCTION ? '/knockout-realworld' : ''
  })

Route
  .usePlugin(
    redirectPlugin,
    componentPlugin,
    initializerPlugin,
    childrenPlugin
  )

Promise.all([
  registerComponents(),
  registerRoutes()
])
  .then(() => {
    const showOverlay = ko.observable(true)
    ko.applyBindings({ showOverlay })
    Router.isNavigating.subscribe(showOverlay)
  })

async function registerComponents() {
  const { default: MANIFEST } = await import(/* webpackMode: "eager" */ './components/manifest')
  ko.components.loaders.unshift(new LazyComponentLoader(MANIFEST))
}

/**
 * Plugins MUST be registered before routes are instantiated. Because imports
 * are hoisted, this means that we need to use dynamic import().
 * 
 * We can use webpack's "eager" module method to ensure that all of the routes
 * are included in the entry bundle. See: https://webpack.js.org/api/module-methods/
 */
async function registerRoutes() {
  const MANIFEST: { [k: string]: Route } = await import(/* webpackMode: "eager" */ './views/manifest')
  Router.useRoutes(Object.keys(MANIFEST).map((k) => MANIFEST[k]))
}