import * as ko from 'knockout'
import { Route, Router } from '@profiscience/knockout-contrib-router'
import {
  componentPlugin
} from '@profiscience/knockout-contrib-router-plugins'
import COMPONENTS from './components/manifest'

Router
  .setConfig({
    hashbang: true
  })
  .usePlugin(
    componentPlugin
  )

registerComponents()

// see note below
registerRoutes()
  .then(() => {
    ko.applyBindings()
  })

export function registerComponents() {
  Object.keys(COMPONENTS).forEach((n) => ko.components.register(n, {}))
  ko.components.loaders.unshift({
    getConfig(name, cb) {
      if (COMPONENTS[name]) {
        COMPONENTS[name]()
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
export async function registerRoutes() {
  const MANIFEST: { [k: string]: Route } = await import(/* webpackMode: "eager" */ './views/manifest')
  Router.useRoutes(Object.keys(MANIFEST).map((k) => MANIFEST[k]))
}