import * as ko from 'knockout'
import { Route, Router } from '@profiscience/knockout-contrib-router'
import {
  componentPlugin,
  initializerPlugin
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
    activePathCSSClass: 'active'
  })

Route
  .usePlugin(
    componentPlugin,
    initializerPlugin
  )

Promise.all([
  registerComponents(),
  registerRoutes()
])
  .then(() => {
    ko.applyBindings()
  })

async function registerComponents() {
  const { default: MANIFEST } = await import(/* webpackMode: "eager" */ './components/manifest')
  Object.keys(MANIFEST).forEach((n) => ko.components.register(n, {}))
  ko.components.loaders.unshift({
    getConfig(name, cb) {
      if (MANIFEST[name]) {
        MANIFEST[name]()
          .then((config) => cb(config))
          .catch((err) => {
            const msg = `Error loading component ${name}`
            console.error(msg)
            cb({ template: msg })
          })
      } else {
        cb(null)
      }
    }
  })
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